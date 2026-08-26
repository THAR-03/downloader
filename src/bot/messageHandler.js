import { config } from "../config.js";
import { menu } from "../commands/menu.js";
import { searchCommand } from "../commands/search.js";
import { detailCommand } from "../commands/detail.js";
import { downloadCommand } from "../commands/download.js";

function textOf(msg) {
  return msg?.message?.conversation ||
    msg?.message?.extendedTextMessage?.text ||
    msg?.message?.imageMessage?.caption ||
    msg?.message?.videoMessage?.caption ||
    "";
}

export async function handleMessage(sock, msg) {
  if (!msg?.message || msg.key.fromMe) return;

  const text = textOf(msg).trim();
  if (!text.startsWith(config.prefix)) return;

  const [rawCmd, ...args] = text.slice(config.prefix.length).trim().split(/\s+/);
  const cmd = rawCmd.toLowerCase();
  const input = args.join(" ").trim();

  if (cmd === "menu" || cmd === "help") {
    return sock.sendMessage(msg.key.remoteJid, { text: menu(config.prefix) });
  }

  if (cmd === "ping") {
    return sock.sendMessage(msg.key.remoteJid, { text: "🏓 Pong!" });
  }

  if (cmd === "search") {
    if (!input) return sock.sendMessage(msg.key.remoteJid, { text: `Gunakan: ${config.prefix}search <judul>` });
    const out = await searchCommand(input);
    return sock.sendMessage(msg.key.remoteJid, { text: out });
  }

  if (cmd === "detail") {
    if (!input) return sock.sendMessage(msg.key.remoteJid, { text: `Gunakan: ${config.prefix}detail <id>` });
    const out = await detailCommand(input);
    return sock.sendMessage(msg.key.remoteJid, { text: out });
  }

  if (cmd === "download") {
    if (!input) return sock.sendMessage(msg.key.remoteJid, { text: `Gunakan: ${config.prefix}download <url>` });
    try {
      const result = await downloadCommand(input);
      if (result?.path) {
        await sock.sendMessage(msg.key.remoteJid, {
          document: { url: result.path },
          mimetype: result.mime || "application/octet-stream",
          fileName: result.fileName || "download"
        });
      } else {
        await sock.sendMessage(msg.key.remoteJid, { text: result?.message || "Download selesai." });
      }
    } catch (e) {
      await sock.sendMessage(msg.key.remoteJid, { text: `❌ ${e.message}` });
    }
  }
}