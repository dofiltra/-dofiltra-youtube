# [youtube-search: Node.js](https://github.com/appit-online/youtube-search)

Search videos on youtube without API key

**Table of contents:**

### Using the library

```javascript

/**
 * Given a search query, searching on youtube
 * @param {string} searchQuery (string or videoId).
 */
const videos = await yt.search({
  searchQuery: 'hello world',
  lang: 'en',
  sp: `CAASBAgCEAE%253D`,
});
const videos = await yt.search({
  searchQuery: 'RQ7bQ2YOdkc',
  lang: 'en',
  sp: `CAASBAgCEAE%253D`,
});
console.log('Videos:');
console.log(videos);

[{ kind: 'youtube#searchResult',
     channel: {
       id: 'UCFzpTuxdolZ_EaZr-emNgbg',
        name: 'David Koller',
        url: 'https://www.youtube.com/channel/UCFzpTuxdolZ_EaZr-emNgbg' 
    },
     id:{
       videoId: 'y5kIrbG2gRc',
        channelId: 'UCFzpTuxdolZ_EaZr-emNgbg' 
    },
     snippet: { 
        url: 'https://www.youtube.com/watch?v=y5kIrbG2gRc',
        thumbnails: {
            "url":"https://i.ytimg.com/vi/y5kIrbG2gRc/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA-pk9HLDSz4VelSFZ01ceyeIpBSw",
            "width":"246",
            "height":"138"
        },
        publishedAt: '',
        duration: '0:01',
        title: 'CATNAP HUNTING MR DELIGHT..! | Poppy Playtime 3 Animation | CATNAP & MR DELIGHT LOVE STORY',
        views: '51',
        description:'..'
      }
},...]
```
