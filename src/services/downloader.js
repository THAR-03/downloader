/*
 * Adapter downloader.
 *
 * This intentionally does not scrape or download copyrighted Doujindesu
 * content. Connect this adapter only to a source/API for which you have
 * permission to download and redistribute the material.
 */

export async function search(query) {
  if (!query?.trim()) throw new Error("Query kosong.");
  return {
    items: [],
    message: "Downloader adapter belum dikonfigurasi. Hubungkan ke API/sumber legal milikmu."
  };
}

export async function getDetail(id) {
  if (!id) throw new Error("ID kosong.");
  return {
    id,
    title: "Contoh konten",
    chapters: [],
    message: "Detail adapter belum dikonfigurasi."
  };
}

export async function downloadAuthorized(url, outputPath) {
  throw new Error(
    "Adapter download belum dikonfigurasi. Gunakan endpoint/sumber yang kamu miliki atau berizin."
  );
}