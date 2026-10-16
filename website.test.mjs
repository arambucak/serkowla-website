import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { once } from "node:events";
import { createPreviewServer } from "./server.mjs";

test("website links, section targets and preview responses", async (t) => {
  const server = createPreviewServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));
  const base = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(base);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /text\/html/);
  const html = await response.text();
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "IDs must be unique");
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(match[1]), `Anchor target ${match[1]} must exist`);
  }

  const legal = await readFile(new URL("./rechtliches.html", import.meta.url), "utf8");
  for (const document of [html, legal]) {
    for (const match of document.matchAll(/(?:href|src)="\.\/([^"#]+)(?:#[^"]*)?"/g)) {
      const asset = await fetch(`${base}/${match[1]}`);
      assert.equal(asset.status, 200, `Local asset ${match[1]} must load`);
      assert.ok(Number(asset.headers.get("content-length")) > 0);
    }
  }
  for (const project of ["parentpeak", "movemal", "flip", "trade"]) {
    assert.ok(html.includes(`data-project="${project}"`));
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.ok(html.includes('lang="de"'));
  assert.ok(html.includes('rel="noopener noreferrer"'));
  assert.ok(html.includes("Konzeptansicht"));
  assert.match(html, /<a class="contact-email" href="mailto:info@serkowla\.com">/);
  assert.ok(!html.includes("Der direkte Kontakt folgt."));
  assert.ok(legal.includes('href="mailto:info@serkowla.com"'));
  assert.ok(legal.includes('id="impressum"'));
  assert.ok(legal.includes('id="datenschutz"'));
  for (const path of ["/not-found", "/package.json", "/server.mjs", "/%2e%2e%2fpackage.json"]) {
    assert.equal((await fetch(`${base}${path}`)).status, 404, path);
  }
  assert.equal((await fetch(`${base}/%E0%A4%A`)).status, 400);
  assert.equal((await fetch(base, { method: "POST" })).status, 405);
  const head = await fetch(`${base}/styles.css`, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
});
