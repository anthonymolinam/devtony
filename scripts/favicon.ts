/**
 * Favicons from the DevTony initials, set in Newsreader and converted to paths
 * (favicons cannot load webfonts). Colors are the DESIGN.md tokens.
 *
 *   bun run favicon preview <dir>   both variants + a 16/32/180 px light/dark sheet, for choosing
 *   bun run favicon build <DT|dt>   public/favicon.svg, public/favicon.ico (32×32), public/apple-touch-icon.png (180×180)
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import opentype from "opentype.js";
import { chromium } from "playwright";

const FONT_FILE = join(import.meta.dir, "..", "node_modules", "@fontsource", "newsreader", "files", "newsreader-latin-400-normal.woff");
const PUBLIC_DIR = join(import.meta.dir, "..", "public");

// DESIGN.md color tokens.
const LIGHT = { canvas: "#FAFAF8", ink: "#1A1A18" };
const DARK = { canvas: "#131312", ink: "#ECEBE7" };

interface Variant {
  text: "DT" | "dt";
  /** Extra space between the letters, in em (negative pulls them into one mark). */
  tracking: number;
}

const VARIANTS: Record<Variant["text"], Variant> = {
  DT: { text: "DT", tracking: -0.11 },
  dt: { text: "dt", tracking: -0.06 },
};

const font = opentype.parse((await readFile(FONT_FILE)).buffer);

/** Path data for the initials scaled and centred into a `size` box, leaving `margin` on each side. */
function initialsPath(variant: Variant, size: number, margin: number): string {
  const layout = (fontSize: number, x0: number, y0: number) => {
    const path = new opentype.Path();
    let x = x0;
    const glyphs = font.stringToGlyphs(variant.text);
    glyphs.forEach((glyph, index) => {
      path.extend(glyph.getPath(x, y0, fontSize));
      const next = glyphs[index + 1];
      const kerning = next ? font.getKerningValue(glyph, next) : 0;
      x += ((glyph.advanceWidth ?? 0) + kerning) * (fontSize / font.unitsPerEm) + variant.tracking * fontSize;
    });
    return path;
  };

  // Measure at 100 units, then scale so the ink box fills the available square.
  const probe = layout(100, 0, 0).getBoundingBox();
  const available = size - margin * 2;
  const scale = Math.min(available / (probe.x2 - probe.x1), available / (probe.y2 - probe.y1));
  const fontSize = 100 * scale;
  const width = (probe.x2 - probe.x1) * scale;
  const height = (probe.y2 - probe.y1) * scale;
  const x0 = (size - width) / 2 - probe.x1 * scale;
  const y0 = (size - height) / 2 - probe.y1 * scale;
  return toPathData(layout(fontSize, x0, y0));
}

/** opentype.js's own toPathData can emit NaN for some coordinates, so serialize the commands here. */
function toPathData(path: opentype.Path): string {
  const n = (value: number) => String(Math.round(value * 100) / 100);
  return path.commands
    .map((c) => {
      switch (c.type) {
        case "M":
        case "L":
          return `${c.type}${n(c.x)} ${n(c.y)}`;
        case "Q":
          return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
        case "C":
          return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
        case "Z":
          return "Z";
      }
    })
    .join("");
}

/** Tab favicon: rounded square, follows the system theme. */
function faviconSvg(variant: Variant): string {
  const d = initialsPath(variant, 64, 6);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <style>
    .bg { fill: ${LIGHT.canvas}; }
    .fg { fill: ${LIGHT.ink}; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: ${DARK.canvas}; }
      .fg { fill: ${DARK.ink}; }
    }
  </style>
  <rect class="bg" width="64" height="64" rx="14"/>
  <path class="fg" d="${d}"/>
</svg>
`;
}

/** Fixed light colors for formats without media queries (ICO, apple-touch-icon). */
function staticSvg(variant: Variant, { rounded, margin }: { rounded: boolean; margin: number }): string {
  const d = initialsPath(variant, 64, margin);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect fill="${LIGHT.canvas}" width="64" height="64"${rounded ? ' rx="14"' : ""}/>
  <path fill="${LIGHT.ink}" d="${d}"/>
</svg>
`;
}

const dataUrl = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

async function renderPng(svg: string, size: number): Promise<Buffer> {
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    // Inline SVG rather than <img>: Chrome dropped part of the path when rasterizing the image.
    await page.setContent(
      `<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
    );
    return await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  } finally {
    await browser.close();
  }
}

/** ICO container holding a single PNG image (supported by every current browser). */
function pngToIco(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(6 + 16);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(size >= 256 ? 0 : size, 6);
  header.writeUInt8(size >= 256 ? 0 : size, 7);
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(header.length, 18);
  return Buffer.concat([header, png]);
}

async function preview(outDir: string) {
  await mkdir(outDir, { recursive: true });
  const cells: string[] = [];
  for (const variant of Object.values(VARIANTS)) {
    const svg = faviconSvg(variant);
    await writeFile(join(outDir, `favicon-${variant.text === "DT" ? "upper" : "lower"}.svg`), svg);
    cells.push(
      `<div class="row"><span class="label">${variant.text}</span>${[16, 32, 180]
        .map((size) => `<img src="${dataUrl(svg)}" width="${size}" height="${size}">`)
        .join("")}</div>`,
    );
  }
  const html = (scheme: "light" | "dark") => `<!doctype html><meta charset="utf-8">
<style>
  body { margin: 0; padding: 24px; font: 14px system-ui; background: ${scheme === "light" ? "#e9e8e4" : "#2b2b29"}; color: ${scheme === "light" ? "#1a1a18" : "#ecebe7"}; }
  h1 { font-size: 14px; margin: 0 0 16px; }
  .row { display: flex; align-items: center; gap: 32px; margin-bottom: 24px; }
  .label { width: 32px; }
</style>
<h1>${scheme} · 16 px · 32 px · 180 px</h1>${cells.join("")}`;

  const browser = await chromium.launch({ channel: "chrome" });
  try {
    for (const scheme of ["light", "dark"] as const) {
      const page = await browser.newPage({ viewport: { width: 460, height: 520 }, deviceScaleFactor: 1, colorScheme: scheme });
      await page.setContent(html(scheme));
      await page.waitForFunction(() => [...document.images].every((img) => img.complete));
      const file = join(outDir, `preview-${scheme}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(file);
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

async function build(text: string) {
  const variant = VARIANTS[text as Variant["text"]];
  if (!variant) throw new Error(`Unknown variant "${text}". Use DT or dt.`);

  await writeFile(join(PUBLIC_DIR, "favicon.svg"), faviconSvg(variant));
  const ico = await renderPng(staticSvg(variant, { rounded: true, margin: 6 }), 32);
  await writeFile(join(PUBLIC_DIR, "favicon.ico"), pngToIco(ico, 32));
  // iOS applies its own rounded mask: full-bleed solid background and a wider margin.
  const touch = await renderPng(staticSvg(variant, { rounded: false, margin: 14 }), 180);
  await writeFile(join(PUBLIC_DIR, "apple-touch-icon.png"), touch);
  console.log("public/favicon.svg, public/favicon.ico, public/apple-touch-icon.png");
}

const [command, arg] = process.argv.slice(2);
if (command === "preview" && arg) await preview(resolve(arg));
else if (command === "build" && arg) await build(arg);
else {
  console.error("Usage: bun run favicon preview <dir> | bun run favicon build <DT|dt>");
  process.exitCode = 1;
}
