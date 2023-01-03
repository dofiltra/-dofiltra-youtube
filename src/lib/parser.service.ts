export class ParserService {

  parseVideo(data: any) {
    if (!data) return undefined;

    try {
      let title = '';
const renderer= data.compactVideoRenderer || data.videoRenderer

      if (renderer){
        title = renderer.title.runs[0].text;
        title = title.replace("\\\\", "\\");

        try {
          title = decodeURIComponent(title);
        } catch (e) {
          // @ts-ignore
        }

        return {
          id: {
            videoId: renderer.videoId
          },
          url: `https://www.youtube.com/watch?v=${renderer.videoId}`,
          title,
          description: renderer.descriptionSnippet && renderer.descriptionSnippet.runs[0] ? renderer.descriptionSnippet.runs[0].text : "",
          duration_raw: renderer.lengthText ? renderer.lengthText.simpleText : null,
          snippet: {
            url: `https://www.youtube.com/watch?v=${renderer.videoId}`,
            duration: renderer.lengthText ? renderer.lengthText.simpleText : null,
            publishedAt: renderer.publishedTimeText ? renderer.publishedTimeText.simpleText : null,
            thumbnails: {
              id: renderer.videoId,
              url: renderer.thumbnail.thumbnails[renderer.thumbnail.thumbnails.length - 1].url,
              default: renderer.thumbnail.thumbnails[renderer.thumbnail.thumbnails.length - 1],
              high: renderer.thumbnail.thumbnails[renderer.thumbnail.thumbnails.length - 1],
              height: renderer.thumbnail.thumbnails[renderer.thumbnail.thumbnails.length - 1].height,
              width: renderer.thumbnail.thumbnails[renderer.thumbnail.thumbnails.length - 1].width
            },
            title,
            views: renderer.viewCountText && renderer.viewCountText.simpleText ? renderer.viewCountText.simpleText.replace(/[^0-9]/g, "") : 0
          },
          views: renderer.viewCountText && renderer.viewCountText.simpleText ? renderer.viewCountText.simpleText.replace(/[^0-9]/g, "") : 0
        };

      } else if (data.videoWithContextRenderer){
        if (data.videoWithContextRenderer.headline?.runs && data.videoWithContextRenderer.headline?.runs.length > 0){
          title = data.videoWithContextRenderer.headline?.runs[0].text;
        }else{
          title = data.videoWithContextRenderer.headline?.accessibility?.accessibilityData?.label;
        }

        title = title.replace("\\\\", "\\");

        try {
          title = decodeURIComponent(title);
        } catch (e) {
          // @ts-ignore
        }

        return {
          id: {
            videoId: data.videoWithContextRenderer.videoId
          },
          url: `https://www.youtube.com/watch?v=${data.videoWithContextRenderer.videoId}`,
          title,
          description: '',
          duration_raw: data.videoWithContextRenderer.lengthText?.accessibility?.accessibilityData?.text,
          snippet: {
            url: `https://www.youtube.com/watch?v=${data.videoWithContextRenderer.videoId}`,
            duration: data.videoWithContextRenderer.lengthText?.accessibility?.accessibilityData?.text,
            publishedAt: data.videoWithContextRenderer.publishedTimeText?.runs?.length > 0 ? data.videoWithContextRenderer.publishedTimeText?.runs[0].text : null,
            thumbnails: {
              id: data.videoWithContextRenderer.videoId,
              url: data.videoWithContextRenderer.thumbnail.thumbnails[data.videoWithContextRenderer.thumbnail.thumbnails.length - 1].url,
              default: data.videoWithContextRenderer.thumbnail.thumbnails[data.videoWithContextRenderer.thumbnail.thumbnails.length - 1],
              high: data.videoWithContextRenderer.thumbnail.thumbnails[data.videoWithContextRenderer.thumbnail.thumbnails.length - 1],
              height: data.videoWithContextRenderer.thumbnail.thumbnails[data.videoWithContextRenderer.thumbnail.thumbnails.length - 1].height,
              width: data.videoWithContextRenderer.thumbnail.thumbnails[data.videoWithContextRenderer.thumbnail.thumbnails.length - 1].width
            },
            title,
            views: data.videoWithContextRenderer.shortViewCountText?.accessibility?.accessibilityData?.label?.replace(/[^0-9]/g, "")
          },
          views: data.videoWithContextRenderer.shortViewCountText?.accessibility?.accessibilityData?.label?.replace(/[^0-9]/g, "")
        };
      }

      return undefined
    } catch (e) {
      return undefined
    }
  }
}
