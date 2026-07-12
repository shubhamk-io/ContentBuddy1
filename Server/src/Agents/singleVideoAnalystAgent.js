import { openAiModel } from "../config/models.js";
import { buildContentAnalysisPrompt } from "../prompts/contentAnalysisPrompt.js";

const cleanJson = (text) => {
    return text.replace(/```json/g, "").replace(/```/g, "").trim();
};

export const singleVideoAnalystAgent = async (state) => {
    try {
        // Build AI Prompt
        const prompt = buildContentAnalysisPrompt({
            title: state.title || "",
            transcript: state.transcript,
            platform: state.platform || "",
            creator: state.creator || "",
            metadata: state.metadata || "",
        });

        // Call OpenAI
        const response = await openAiModel.invoke(prompt);

        // Parse JSON
        const analysis = JSON.parse(cleanJson(response.content));

        return {
            singleVideoAnalysis: analysis,
            searchQuery: analysis.searchQuery,
        };
    } catch (error) {
        console.error("Single video analysis error:", error);

        return {
            error: "Failed to analyze video content",
        };
    }
};