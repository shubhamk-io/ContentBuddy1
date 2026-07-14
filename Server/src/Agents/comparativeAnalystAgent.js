import { buildContentAnalysisPrompt } from "../prompt/analysePrompt";
import { llm } from "../utils/llmModel";
import { getTranscript } from "../utils/transcript";



const cleanjson = (text) => {
    return text.replace(/```json/g, "").replace(/```/g,"").trim();
}

export const comparativeAnalystAgent = (state) => {
    if(!state.similarVideos || state.similarVideos.length === 0){
        return {similarVideos: []};

    }

const analyze = []

for(const video of state.similarVideos){
    try {
        const transcriptResult = await getTranscript(video.url)

if(!transcriptResult.success){
    continue ;
}

const prompt = buildContentAnalysisPrompt({
    title:video.title,
    transcript:transcriptResult.transcript,
    platform: state.platform,
     creator: video.channerTitle,
             metadata: `Published: ${video.publishedAt || "unknown"}`,

})

const result = await llm.invoke(prompt);
const analyze = JSON.parse(cleanjson(result.content))

analyses.push({
videoId : video.videoId,
title :video.title,
channerTitle: video.channelTitle,
url: video.url,
thumbnail: video.thumbnail,
analysis,
})


    } catch (error) {
        console.log(`Skipping video ${video.videoId} due to error:`, error.message);
      continue;
    }
}

return {similarVideoAnalysis : analyses}
}