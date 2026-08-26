import { ensureDownloadDir } from "./utils/files.js";
import { startBot } from "./bot/connection.js";

await ensureDownloadDir();
console.log("🚀 Starting WhatsApp Downloader Bot...");
await startBot();