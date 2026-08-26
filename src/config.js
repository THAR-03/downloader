import "dotenv/config";

export const config = {
  botName: process.env.BOT_NAME || "DownloaderBot",
  prefix: process.env.PREFIX || "!",
  owner: process.env.OWNER_NUMBER || "",
  maxFileMB: Number(process.env.MAX_FILE_MB || 50),
  downloadDir: process.env.DOWNLOAD_DIR || "downloads",
  autoDeleteMinutes: Number(process.env.AUTO_DELETE_MINUTES || 10)
};