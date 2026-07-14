import { YoutubeTranscript } from "youtube-transcript";
import { detectPlatform } from "./detectPlatform";
import { downloadAudio } from "../services/downloadAudio";
import { transcribeAudio } from "../services/transcriptAudioOpenAI";


// Fast Path - YouTube Captions

export const getYoutubeTranscript = async (contentUrl) => {
  try {
    const items = await YoutubeTranscript.fetchTranscript(contentUrl);

    if (!items || items.length === 0) {
      return {
        success: false,
        error: "No captions available.",
      };
    }

    const fullText = items
      .map((item) => item.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    return {
      success: true,
      transcript: fullText,
      method: "captions",
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch YouTube captions.",
    };
  }
};


// Slow Path - Whisper

export const getWhisperTranscript = async (contentUrl) => {
  try {
    // Download Audio
    const downloadResult = await downloadAudio(contentUrl);

    if (!downloadResult.success) {
      return {
        success: false,
        error: downloadResult.error,
      };
    }

    // Transcribe Audio
    const transcriptResult = await transcribeAudio(
      downloadResult.filePath
    );

    if (!transcriptResult.success) {
      return {
        success: false,
        error: transcriptResult.error,
      };
    }

    return {
      success: true,
      transcript: transcriptResult.transcript,
      method: "whisper",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Main Function

export const getTranscript = async (contentUrl) => {
  const platform = detectPlatform(contentUrl);

  if (platform === "invalid" || platform === "unsupported") {
    return {
      success: false,
      error: "Invalid or Unsupported URL.",
    };
  }

  
  // YouTube
 
  if (platform === "youtube") {
    const captionsResult = await getYoutubeTranscript(contentUrl);

    if (captionsResult.success) {
      return {
        ...captionsResult,
        platform,
      };
    }

    console.log(
      "⚠️ Captions unavailable. Falling back to Whisper..."
    );
  }

  
  // Instagram OR YouTube Fallback

  const whisperResult = await getWhisperTranscript(contentUrl);

  if (!whisperResult.success) {
    return {
      success: false,
      error: whisperResult.error,
    };
  }

  return {
    ...whisperResult,
    platform,
  };
};