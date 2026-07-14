import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

export const downloadAudio = async (videoUrl, outputDir = "./temp") => {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileName = `audio_${Date.now()}`;
    const outputTemplate = path.join(outputDir, fileName);

    // yt-dlp downloads audio and uses ffmpeg internally to convert to mp3
    const command = `yt-dlp -x --audio-format mp3 --audio-quality 5 -o "${outputTemplate}.%(ext)s" "${videoUrl}"`;

    await execAsync(command, { timeout: 120000 }); // 2 min timeout

    const finalPath = `${outputTemplate}.mp3`;

    if (!fs.existsSync(finalPath)) {
      return { success: false, error: "Audio download failed — file not created" };
    }

    return { success: true, filePath: finalPath };
  } catch (error) {
    console.log("Audio download error:", error.message);

    if (error.message.includes("Private video")) {
      return { success: false, error: "This video is private" };
    }
    if (error.message.includes("not available")) {
      return { success: false, error: "Video not available or has been removed" };
    }

    return { success: false, error: "Failed to download audio from video" };
  }
};