import { search } from "../services/downloader.js";

export async function searchCommand(query) {
  const result = await search(query);
  if (!result.items?.length) return `🔎 ${result.message}`;
  return result.items.map((x, i) => `${i + 1}. ${x.title} (${x.id})`).join("\n");
}