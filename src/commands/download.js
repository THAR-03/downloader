import { downloadAuthorized } from "../services/downloader.js";

export async function downloadCommand(url) {
  if (!/^https?:\/\//i.test(url || "")) {
    throw new Error("URL tidak valid.");
  }
  return downloadAuthorized(url, null);
}