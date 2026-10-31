const fs = require("fs");
const path = require("path");

const css = fs.readFileSync(path.join(__dirname, "_extracted", "styles.css"), "utf8");
const faces = [];
const re = /@font-face\{font-family:"([^"]+)"[^}]+\}/g;
let match;
while ((match = re.exec(css))) {
  faces.push({
    family: match[1],
    hasData: match[0].includes("data:font"),
    len: match[0].length,
    tail: match[0].slice(-90),
  });
}

console.log(JSON.stringify(faces, null, 2));

const replacements = {
  Figtree:
    '@font-face{font-family:"Figtree";src:url("/text/Figtree.woff2") format("woff2");font-weight:300 900;font-display:swap}',
  "Inter Tight":
    '@font-face{font-family:"Inter Tight";src:url("/text/InterTight.woff2") format("woff2");font-weight:100 900;font-display:swap}',
  Pretendard:
    '@font-face{font-family:"Pretendard";src:url("/text/Pretendard.woff") format("woff");font-weight:100 900;font-display:swap}',
};

const cleaned = css.replace(/@font-face\{font-family:"([^"]+)"[^}]+\}/g, (block, family) => {
  if (block.includes("data:font") && replacements[family]) return replacements[family];
  return block;
});

const outDir = path.join(__dirname, "..", "styles");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "craft-lab.css"), cleaned.trimStart());
console.log("wrote styles/craft-lab.css", cleaned.length);
