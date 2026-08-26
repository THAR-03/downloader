import { getDetail } from "../services/downloader.js";

export async function detailCommand(id) {
  const d = await getDetail(id);
  const chapters = d.chapters?.length
    ? d.chapters.map((x, i) => `${i + 1}. ${x.title || x.id}`).join("\n")
    : "(belum tersedia)";
  return `📖 ${d.title}\n\nChapter:\n${chapters}\n\n${d.message || ""}`;
}