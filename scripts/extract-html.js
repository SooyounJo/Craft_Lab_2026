const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "..", "public", "craft-lab.html");
const html = fs.readFileSync(htmlPath, "utf8");
const assetsDir = path.join(__dirname, "..", "public", "assets");
const textDir = path.join(__dirname, "..", "public", "text");
const outDir = path.join(__dirname, "..", "scripts", "_extracted");

fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

const extMap = {
  "image/webp": "webp",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/svg+xml": "svg",
  "font/woff2": "woff2",
  "font/woff": "woff",
};

function decodeDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:([^;,]+)(;base64)?,(.*)$/s);
  if (!match) return null;
  const mime = match[1];
  const isB64 = Boolean(match[2]);
  const payload = match[3];
  return {
    mime,
    ext: extMap[mime] || "bin",
    buffer: isB64 ? Buffer.from(payload, "base64") : Buffer.from(decodeURIComponent(payload)),
  };
}

let imgIndex = 0;
const rewritten = html.replace(/src="(data:[^"]+)"/g, (_, dataUrl) => {
  const decoded = decodeDataUrl(dataUrl);
  if (!decoded) return `src="${dataUrl}"`;
  imgIndex += 1;
  const name = `img-${String(imgIndex).padStart(2, "0")}.${decoded.ext}`;
  fs.writeFileSync(path.join(assetsDir, name), decoded.buffer);
  return `src="/assets/${name}"`;
});

const fontNames = [
  { family: "Figtree", file: "Figtree.woff2" },
  { family: "Inter Tight", file: "InterTight.woff2" },
  { family: "Pretendard", file: "Pretendard.woff" },
];

fontNames.forEach(({ family, file }) => {
  const re = new RegExp(
    `@font-face\\{font-family:"${family.replace(" ", "\\s")}"[^}]*url\\((data:[^)]+)\\)`,
    "s"
  );
  const match = html.match(re);
  if (!match) return;
  const decoded = decodeDataUrl(match[1]);
  if (!decoded) return;
  fs.writeFileSync(path.join(textDir, file), decoded.buffer);
});

const cssBlocks = [];
const styleRe = /<style>([\s\S]*?)<\/style>/g;
let styleMatch;
while ((styleMatch = styleRe.exec(rewritten))) {
  cssBlocks.push(styleMatch[1]);
}

const cleanedCss = cssBlocks
  .join("\n\n")
  .replace(/@font-face\{font-family:"Figtree";src:url\(data:[^)]+\);[^}]*\}/g, '@font-face{font-family:"Figtree";src:url("/text/Figtree.woff2") format("woff2");font-display:swap}')
  .replace(/@font-face\{font-family:"Inter Tight";src:url\(data:[^)]+\);[^}]*\}/g, '@font-face{font-family:"Inter Tight";src:url("/text/InterTight.woff2") format("woff2");font-display:swap}')
  .replace(/@font-face\{font-family:"Pretendard";src:url\(data:[^)]+\);[^}]*\}/g, '@font-face{font-family:"Pretendard";src:url("/text/Pretendard.woff") format("woff");font-display:swap}');

const bodyMatch = rewritten.match(/<body>([\s\S]*)<\/body>/);
const scriptMatch = rewritten.match(/<script>([\s\S]*)<\/script>/);

fs.writeFileSync(path.join(outDir, "styles.css"), cleanedCss);
fs.writeFileSync(path.join(outDir, "body.html"), bodyMatch ? bodyMatch[1] : "");
fs.writeFileSync(path.join(outDir, "script.js"), scriptMatch ? scriptMatch[1] : "");

const assets = fs.readdirSync(assetsDir);
console.log(JSON.stringify({ images: assets, styles: cleanedCss.length, body: bodyMatch ? bodyMatch[1].length : 0 }, null, 2));
