import { ProxyHelper, ProxyItem } from '@dofiltra/helpers'
import { ParserService } from './parser.service'
import { getFetchHap } from 'doback'

const rfc3986EncodeURIComponent = (str: string) => encodeURIComponent(str).replace(/[!'()*]/g, escape)

export async function searchVideo({
  searchQuery,
  proxy,
  lang = 'en',
  sp = `CAASBAgCEAE%253D`,
}: {
  searchQuery: string
  proxy?: ProxyItem
  lang?: string
  sp?: string
}) {
  const YOUTUBE_URL = 'https://www.youtube.com'

  const results = []
  let details = []
  let fetched = false

  const options = { type: 'video', limit: 0 }
  const url = `${YOUTUBE_URL}/results?search_query=${rfc3986EncodeURIComponent(searchQuery.trim())}&hl=${lang}&sp=${sp}`

  const fh = await getFetchHap({ timeout: 30e3 })
  const searchRes = await fh(url, {
    proxy: proxy && ProxyHelper.url({ proxyItem: proxy }),
  })

  let html = await searchRes.text()

  // try to parse html
  try {
    const data = html.split('ytInitialData = ')[1].split('</script>')[0]

    // @ts-ignore
    html = data
      .replace(/\\x([0-9A-F]{2})/gi, (...items: any[]) => {
        return String.fromCharCode(parseInt(items[1], 16))
      })
      .replaceAll('\\\\"', '')

    while (html.length && !html.startsWith('{')) {
      html = html.slice(1)
    }

    while (html.length && !html.endsWith('}')) {
      html = html.slice(0, -1)
    }

    html = JSON.parse(html)
  } catch (e) {
    /* nothing */
  }

  if (
    html?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]
      .itemSectionRenderer?.contents?.length
  ) {
    details =
      html.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer
        .contents
    fetched = true
  }

  if (
    html &&
    html.contents &&
    html.contents.sectionListRenderer &&
    html.contents.sectionListRenderer.contents &&
    html.contents.sectionListRenderer.contents.length > 0 &&
    html.contents.sectionListRenderer.contents[0].itemSectionRenderer &&
    html.contents.sectionListRenderer.contents[0].itemSectionRenderer.contents.length > 0
  ) {
    details = html.contents.sectionListRenderer.contents[0].itemSectionRenderer.contents
    fetched = true
  }
  // backup/ alternative parsing
  if (!fetched) {
    try {
      details = JSON.parse(
        html
          .split('{"itemSectionRenderer":{"contents":')
          [html.split('{"itemSectionRenderer":{"contents":').length - 1].split(',"continuations":[{')[0]
      )
      fetched = true
    } catch (e) {
      /* nothing */
    }
  }
  if (!fetched) {
    try {
      details = JSON.parse(
        html
          .split('{"itemSectionRenderer":')
          [html.split('{"itemSectionRenderer":').length - 1].split('},{"continuationItemRenderer":{')[0]
      ).contents
      fetched = true
    } catch (e) {
      /* nothing */
    }
  }

  if (!fetched) return []

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < details.length; i++) {
    if (typeof options.limit === 'number' && options.limit > 0 && results.length >= options.limit) break
    const data = details[i]

    const parserService = new ParserService()
    const parsed = parserService.parseVideo(data)
    if (!parsed) continue
    const res = parsed

    results.push(res)
  }

  return results
}
