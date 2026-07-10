
import { Annotation } from "@langchain/langgraph"

export const AnalysisState = Annotation.Root({

    contentUrl: Annotation(),
    platform: Annotation(),
    transcript: Annotation(),
    singleVideoAnalysis: Annotation(),
    searchQuery: Annotation(),
    similarVideo: Annotation({
        default: () => [],
        reducer: (prev, next) => next,
    }),
    similarVideoAnalysis: Annotation({
        default: () => [],
        reducer: (prev, next) => prev.concat(next)
    }),
    finalReport: Annotation(),
    error: Annotation()

})