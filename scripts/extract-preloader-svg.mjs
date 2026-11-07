import fs from "fs";

const html = fs.readFileSync("legacy/index.html", "utf8");
const svgMatch = html.match(
  /<div class="preloader-v4__wrap">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
);

if (!svgMatch) {
  console.error("SVG not found");
  process.exit(1);
}

const svg = svgMatch[1].trim();
const wings = svg.match(/class="wings" d="([^"]+)"/)?.[1] ?? "";

const out = `// Auto-extracted from legacy/index.html
export const preloaderWingsPath = ${JSON.stringify(wings)};
`;

fs.writeFileSync("src/data/preloaderLogoPaths.ts", out);
console.log("wings path length:", wings.length);
