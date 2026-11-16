import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createChatHandler } from "./agente/servidor.js";

const port = Number(process.env.PORT || 8787);
const origin = process.env.ORIGENS || "https://allanrodriguescosta.github.io";
const allowedOrigins = new Set(origin.split(",").map((value) => value.trim()).filter(Boolean));
const root = fileURLToPath(new URL("./agente/", import.meta.url));
const types = { ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".md": "text/markdown; charset=utf-8" };
const chat = await createChatHandler({ env: process.env });

function cors(req, res) {
  const requestOrigin = req.headers.origin;
  if (requestOrigin && allowedOrigins.has(requestOrigin)) res.setHeader("access-control-allow-origin", requestOrigin);
  res.setHeader("vary", "Origin");
  res.setHeader("access-control-allow-methods", "POST, OPTIONS");
  res.setHeader("access-control-allow-headers", "content-type");
}

createServer(async (req, res) => {
  cors(req, res);
  if (req.method === "OPTIONS") return res.writeHead(204).end();
  if (req.url === "/saude") return res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify({ ok: true, ia: Boolean(chat.agente.atual.ia) }));
  if (req.url === "/api/agente" && req.method === "POST") return chat(req, res);
  if (req.method !== "GET" || !req.url?.startsWith("/agente/")) return res.writeHead(404).end("Não encontrado");
  const requested = normalize(req.url.slice("/agente/".length).split("?")[0]).replace(/^([/\\])+/, "");
  const file = join(root, requested);
  if (!file.startsWith(root)) return res.writeHead(403).end("Proibido");
  try {
    const data = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream", "cache-control": "public, max-age=300" }).end(data);
  } catch { res.writeHead(404).end("Não encontrado"); }
}).listen(port, "0.0.0.0", () => console.log(`Agente cOillect em :${port}`));
