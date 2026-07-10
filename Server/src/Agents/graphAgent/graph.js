import { END, START, StateGraph } from "@langchain/langgraph"
import { AnalysisState } from "./state"
import { detectPlatform } from "../../utils/detectPlatform"
import { transcriptAgent } from "../transcriptAgent"
import { singleVideoAnalystAgent } from "../singleVideoAnalystAgent"
import { similarVideoFinderAgent } from "../similarVideoFinderAgent"
import { comparativeAnalystAgent } from "../comparativeAnalystAgent"
import { reportGeneratorAgent } from "../reportGeneratorAgent"


const grap = new StateGraph(AnalysisState)
    .addNode("detectPlatform", detectPlatform)
    .addNode("getTranscript", transcriptAgent)
    .addNode("analyzeVideo", singleVideoAnalystAgent)
    .addNode("findSimilar", similarVideoFinderAgent)
    .addNode("compareVideos", comparativeAnalystAgent)
    .addNode("generateReport", reportGeneratorAgent)


    .addEdge(START, "detectPlatform")
    .addConditionalEdges("detectPlatform", (state) => state.erro ? END : "getTranscript")
    .addConditionalEdges("getTranscript", (state) => state.error ? END : "analyzeVideo")
    .addEdge("analyzeVideo", "findSimilar")
    .addEdge("compareVideos", "generateReport")
addEdge("generateReport", END);

export const analysisGraph = grap.compile();
