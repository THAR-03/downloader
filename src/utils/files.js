import fs from "node:fs/promises";
import path from "node:path";
import { config } from "../config.js";

export async function ensureDownloadDir() {
  await fs.mkdir(config.downloadDir, { recursive: true });
}

export async function cleanupFile(filePath) {
  try { await fs.unlink(filePath); } catch {}
}

export function safeName(name) {
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").slice(0, 120);
}