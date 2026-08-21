/**
 * Removes 0-byte Next.js image-optimizer cache files that poison the LRU cache.
 * Run: node scripts/clean-image-cache.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cacheRoots = [
  path.join(root, ".next", "cache", "images"),
  path.join(root, ".next", "dev", "cache", "images"),
];

function walk(dir, onFile) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, onFile);
    else onFile(full);
  }
}

let removed = 0;
for (const cacheRoot of cacheRoots) {
  walk(cacheRoot, (file) => {
    const size = fs.statSync(file).size;
    if (size === 0) {
      fs.unlinkSync(file);
      removed += 1;
    }
  });
}

console.log(removed ? `Removed ${removed} empty image cache file(s).` : "No empty image cache files found.");
