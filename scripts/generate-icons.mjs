/**
 * Generates PWA / favicon PNGs from the brand logo.
 * Run: node scripts/generate-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "public", "images", "logo.jpg");
const outDir = path.join(root, "public", "icons");
const faviconPath = path.join(root, "public", "favicon.ico");

if (!fs.existsSync(source)) {
  console.error("Missing source logo:", source);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

/** Zoom into circular emblem to crop watermark padding (matches BrandLogo scale ~1.42). */
async function cropLogo(size, { padded = false } = {}) {
  const meta = await sharp(source).metadata();
  const w = meta.width ?? 1000;
  const h = meta.height ?? 1000;
  const side = Math.min(w, h);
  const zoom = 1.42;
  const crop = Math.round(side / zoom);
  const left = Math.round((w - crop) / 2);
  const top = Math.round((h - crop) / 2);

  let pipeline = sharp(source)
    .extract({ left, top, width: crop, height: crop })
    .resize(size, size, { fit: "cover" });

  if (padded) {
    // Maskable: ~80% safe zone with brand-blue padding
    const inner = Math.round(size * 0.8);
    const pad = Math.round((size - inner) / 2);
    const icon = await pipeline.png().toBuffer();
    pipeline = sharp({
      create: {
        width: size,
        height: size,
        channels: 3,
        background: { r: 14, g: 79, b: 136 },
      },
    }).composite([{ input: await sharp(icon).resize(inner, inner).png().toBuffer(), left: pad, top: pad }]);
  }

  return pipeline.png();
}

const targets = [
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "icon-maskable-512.png", size: 512, padded: true },
];

for (const target of targets) {
  const out = path.join(outDir, target.file);
  await (await cropLogo(target.size, { padded: target.padded })).toFile(out);
  console.log("Wrote", out);
}

// Multi-size ICO (16, 32, 48)
const ico16 = await (await cropLogo(16)).toBuffer();
const ico32 = await (await cropLogo(32)).toBuffer();
const ico48 = await (await cropLogo(48)).toBuffer();
await sharp(ico48)
  .resize(48, 48)
  .toFormat("png")
  .toFile(path.join(outDir, "favicon-48.png"));

// Prefer a PNG-based favicon copy browsers accept; also write 32px as favicon.ico via png rename fallback
await sharp(ico32).png().toFile(path.join(root, "public", "favicon-32.png"));
await sharp(ico16).png().toFile(path.join(root, "public", "favicon-16.png"));

// Write a real .ico if possible (png packed); sharp can output ico on some builds — fallback to 48 png copy
try {
  await sharp(ico48).resize(48, 48).toFile(faviconPath);
  console.log("Wrote", faviconPath);
} catch {
  fs.copyFileSync(path.join(outDir, "favicon-48.png"), faviconPath.replace(/\.ico$/, ".png"));
  // Keep a png favicon as public/favicon.ico alternative via copying 32 png named for browsers that need png
  fs.copyFileSync(path.join(root, "public", "favicon-32.png"), path.join(root, "public", "favicon.ico"));
  console.log("Wrote favicon.ico as PNG bytes fallback");
}

console.log("Icon generation complete.");
