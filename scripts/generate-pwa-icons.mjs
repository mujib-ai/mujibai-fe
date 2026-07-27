// One-off generator for PWA app icons from the existing brand mark
// (public/loader-logo.svg). Run with: node scripts/generate-pwa-icons.mjs
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharpPkg from '../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js';

const sharp = sharpPkg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const iconsDir = path.join(publicDir, 'icons');

const BRAND_BG = '#001434';
const SVG_PATH = path.join(publicDir, 'loader-logo.svg');
const svgBuffer = readFileSync(SVG_PATH);

async function makeIcon({ size, outFile, padRatio, background }) {
  const contentSize = Math.round(size * (1 - padRatio * 2));
  const mark = await sharp(svgBuffer, { density: 384 })
    .resize(contentSize, contentSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(path.join(iconsDir, outFile));

  console.log(`wrote ${outFile} (${size}x${size})`);
}

async function main() {
  await sharp({
    create: { width: 1, height: 1, channels: 4, background: BRAND_BG },
  })
    .png()
    .toBuffer(); // sanity check sharp is functional

  await makeIcon({
    size: 192,
    outFile: 'icon-192.png',
    padRatio: 0.12,
    background: BRAND_BG,
  });
  await makeIcon({
    size: 512,
    outFile: 'icon-512.png',
    padRatio: 0.12,
    background: BRAND_BG,
  });
  await makeIcon({
    size: 512,
    outFile: 'icon-maskable-512.png',
    // maskable safe zone: keep the mark inside the inner ~80% circle
    padRatio: 0.22,
    background: BRAND_BG,
  });
  await makeIcon({
    size: 180,
    outFile: 'apple-touch-icon.png',
    padRatio: 0.14,
    background: BRAND_BG,
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
