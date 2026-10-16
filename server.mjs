import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, extname } from "node:path";

const root = fileURLToPath(new URL(".", import.meta.url));
const files = new Set(["index.html", "styles.css", "script.js", "favicon.svg", "serkowlalogo.png", "rechtliches.html"]);
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png"
};

export function createPreviewServer() {
  return createServer(async (request, response) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" });
      response.end("Method not allowed");
      return;
    }
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    } catch {
      response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Ungültige Anfrage");
      return;
    }
    const filename = pathname === "/" ? "index.html" : pathname.slice(1);
    if (!files.has(filename)) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Datei nicht gefunden");
      return;
    }
    try {
      const path = resolve(root, filename);
      const info = await stat(path);
      const contents = request.method === "HEAD" ? null : await readFile(path);
      response.writeHead(200, {
        "Content-Type": contentTypes[extname(filename)],
        "Content-Length": info.size,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      });
      response.end(contents);
    } catch (error) {
      console.error(`Vorschau-Datei konnte nicht geladen werden: ${filename}`, error);
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Datei konnte nicht geladen werden");
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error("PORT muss eine ganze Zahl zwischen 1 und 65535 sein.");
    process.exitCode = 1;
  } else {
    const server = createPreviewServer();
    server.on("error", (error) => {
      console.error("Der Vorschau-Server konnte nicht gestartet werden:", error.message);
      process.exitCode = 1;
    });
    server.listen(port, "127.0.0.1", () => {
      console.log(`Serkowla-Vorschau: http://127.0.0.1:${port}`);
    });
  }
}
