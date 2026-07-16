import axios from "axios"

export const findSimilarVideos = async (searchQuery, maxResult = 5) => {
    try {
        if (!process.env.YOUTUBE_API_KEY) {
            console.log("Youtube APi key is missing and problem")
            return [];

            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
                searchQuery
            )}&type=video&order=viewCount&maxResults=${maxResults}&key=${process.env.YOUTUBE_API_KEY}`;


            const { data } = await axios.get(
                url, {
                params: {
                    part: "snippet",
                    q: searchQuery,
                    type: "video",
                    order: "viewCount",
                    maxResults: maxResults,
                    key: process.env.YOUTUBE_API_KEY
                }
            }
            );

            if (!data.items || data.items.length === 0) {
                return [];
            }


            return data.items.map((item) => ({
                videoId: item.id.videoId,
                title: item.snippet.title,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                thumbnail: item.snippet.thumbnails.medium.url,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            }))

        }
    } catch (error) {
        if (error.response) {
            console.log("YOUTUBE API ERROR:", error.response.data?.error.message || error.response.statusText)
        } else {
            console.log("YOUTUBE search error:", error.message)
        }
        return [];
    }
}