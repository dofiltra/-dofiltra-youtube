import type { TYtSearchVideoItem } from '@dofiltra/types'

export class ParserService {
  parseVideo(data: any) {
    const renderer = data?.compactVideoRenderer || data?.videoRenderer || data?.videoWithContextRenderer

    if (!renderer) {
      return undefined
    }

    try {
      const title = this.getTitle({ data })
      const views =
        renderer?.viewCountText?.simpleText?.replace?.(/[^0-9]/g, '') ||
        renderer?.shortViewCountText?.accessibility?.accessibilityData?.label?.replace(/[^0-9]/g, '') ||
        0
      const channel = {
        isVerified: renderer?.ownerBadges?.[0]?.metadataBadgeRenderer?.tooltip === 'Verified',
      }
      const thumbnails = renderer.thumbnail?.thumbnails

      const result: TYtSearchVideoItem = {
        id: {
          videoId: renderer.videoId,
        },
        url: `https://www.youtube.com/watch?v=${renderer.videoId}`,
        title,
        description: renderer?.descriptionSnippet?.runs?.[0]?.text || '',
        duration_raw: renderer?.lengthText?.simpleText || renderer?.lengthText?.accessibility?.accessibilityData?.text,
        views,
        channel,

        snippet: {
          url: `https://www.youtube.com/watch?v=${renderer.videoId}`,
          duration: renderer?.lengthText?.simpleText || renderer.lengthText?.accessibility?.accessibilityData?.text,
          publishedAt: renderer?.publishedTimeText?.simpleText || renderer.publishedTimeText?.runs?.[0]?.text,
          thumbnails: {
            id: renderer.videoId,
            url: thumbnails?.[thumbnails?.length - 1]?.url,
            default: thumbnails?.[thumbnails?.length - 1],
            high: thumbnails[thumbnails.length - 1],
            height: thumbnails[thumbnails.length - 1].height,
            width: thumbnails[thumbnails.length - 1].width,
          },
          title,
          views,
        },
      } as TYtSearchVideoItem

      return result
    } catch (e) {
      //
    }

    return undefined
  }

  private getTitle({ data }: { data: any }) {
    let renderer = data?.compactVideoRenderer || data?.videoRenderer
    let title = renderer?.title?.runs?.[0]?.text

    if (!title) {
      renderer = data?.videoWithContextRenderer

      if (renderer?.headline?.runs && renderer?.headline?.runs?.length > 0) {
        title = renderer?.headline?.runs?.[0]?.text
      } else {
        title = renderer.headline?.accessibility?.accessibilityData?.label
      }
    }

    try {
      title = (title || '').replace?.('\\\\', '\\') || ''
      title = decodeURIComponent(title)
    } catch (e) {
      // @ts-ignore
    }

    return title || ''
  }
}
