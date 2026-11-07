import fs from "fs";
import path from "path";

const mjsDir = "public/assets/mjs";
const files = fs
  .readdirSync(mjsDir)
  .filter((f) => f.endsWith(".bundle.js") && f !== "app.bundle.js");

function readString(js, start) {
  const quote = js[start];
  let i = start + 1;
  let out = "";
  while (i < js.length) {
    const ch = js[i];
    if (ch === "\\") {
      const next = js[i + 1];
      if (next === "n") out += "\n";
      else if (next === quote) out += quote;
      else if (next === "\\") out += "\\";
      else out += next ?? "";
      i += 2;
      continue;
    }
    if (ch === quote) return { value: out, end: i + 1 };
    out += ch;
    i++;
  }
  return { value: out, end: i };
}

function parseJsonStringLiteral(literal) {
  try {
    return JSON.parse(literal);
  } catch {
    return null;
  }
}

function resolveModuleExport(js, moduleId) {
  const match = js.match(new RegExp(`${moduleId}:e=>\\{e\\.exports=("(?:\\\\.|[^"\\\\])*")\\}`));
  if (match) return parseJsonStringLiteral(match[1]);

  const alt = js.match(new RegExp(`${moduleId}:e=>"([^"]+)"`));
  if (alt) return alt[1];

  return null;
}

function resolveIdentifier(js, beforeIndex, name) {
  const scope = js.slice(0, beforeIndex);

  const direct = [...scope.matchAll(new RegExp(`\\b${name}=r\\((\\d+)\\)`, "g"))].at(-1);
  if (direct) return resolveModuleExport(js, direct[1]);

  const wrapped = [...scope.matchAll(new RegExp(`\\b${name}=([a-z])\\(\\)\\(([a-z])\\(\\)\\)`, "g"))].at(-1);
  if (wrapped) {
    const innerVar = wrapped[2];
    const viaN = scope.match(new RegExp(`\\b${innerVar}=([a-z])\\.n\\(([a-z])\\)`));
    if (viaN) {
      const outerVar = viaN[2];
      const outerImport = scope.match(new RegExp(`\\b${outerVar}=r\\((\\d+)\\)`));
      if (outerImport) return resolveModuleExport(js, outerImport[1]);
    }

    const directInner = scope.match(new RegExp(`\\b${innerVar}=r\\((\\d+)\\)`));
    if (directInner) return resolveModuleExport(js, directInner[1]);
  }

  return null;
}

function parsePushExpression(js, start) {
  let i = start;
  let css = "";

  while (i < js.length) {
    while (js[i] === " " || js[i] === "\n" || js[i] === "\r" || js[i] === "\t") i++;

    if (js[i] === '"' || js[i] === "'") {
      const part = readString(js, i);
      css += part.value;
      i = part.end;
      continue;
    }

    if (js[i] === "+") {
      i++;
      while (js[i] === " ") i++;
      const ident = js.slice(i).match(/^([a-zA-Z_$][\w$]*)/)?.[1];
      if (ident) {
        const value = resolveIdentifier(js, start, ident);
        if (value) css += value;
        i += ident.length;
      }
      if (js[i] === "+") i++;
      continue;
    }

    if (js[i] === "," && (js.slice(i, i + 4) === ',""' || js.slice(i, i + 3) === ',"')) {
      break;
    }
    if (js[i] === ")" && js.slice(i, i + 2) === "])") {
      break;
    }

    break;
  }

  return css;
}

function extractCss(js) {
  const chunks = [];
  const re = /\.push\(\[[a-z]\.id,/g;
  let match;

  while ((match = re.exec(js)) !== null) {
    let i = match.index + match[0].length;
    const css = parsePushExpression(js, i);
    if (css.includes("{")) chunks.push(css);
  }

  return chunks;
}

function sanitizeChunk(css) {
  const markers = [",]);const", "@@toPrimitive", "e.exports=function", "undefinedpp"];
  let end = css.length;
  for (const marker of markers) {
    const idx = css.indexOf(marker);
    if (idx >= 0) end = Math.min(end, idx);
  }
  return css.slice(0, end);
}

const all = [];
for (const file of files) {
  const js = fs.readFileSync(path.join(mjsDir, file), "utf8");
  all.push(...extractCss(js).map(sanitizeChunk));
}

let css = all.join("\n");
css = css.replace(/url\(\s*\n/g, "url(none)\n");
css = css.replace(/content:;/g, 'content:"";');
css = css.replace(/url\((data:image\/[^)]+)\)/g, 'url("$1")');

fs.writeFileSync("public/assets/css/component-styles.css", css);

console.log("chunks:", all.length, "bytes:", css.length);
console.log("hero-banner_navigation:", css.includes("hero-banner_navigation"));
console.log("data:image:", css.includes("data:image"));
console.log("garbage markers:", css.includes("@@toPrimitive"));
console.log("broken url(+var+):", /url\(\+[a-z]\+\)/.test(css));
