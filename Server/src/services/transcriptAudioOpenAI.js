
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const transcribeAudio = async (filePath) => {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "gpt-4o-transcribe", // same price as whisper-1, better accuracy (~22% fewer errors)
      response_format: "text",
    });

    return { success: true, transcript: transcription.trim() };
  } catch (error) {
    console.log("Transcription error:", error.message);
    return { success: false, error: "Failed to transcribe audio" };
  } finally {
    // Always cleanup the temp audio file after transcription attempt
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};