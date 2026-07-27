import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from '../node_modules/.pnpm/playwright-core@1.57.0/node_modules/playwright-core/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });

await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

const el = await page.locator('text=Interactive Experience').first();
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: path.join(__dirname, '..', 'ie-voice.png') });

await page.getByRole('tab', { name: /النص إلى كلام|Text to Speech/ }).click();
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(__dirname, '..', 'ie-tts.png') });

await page.getByRole('tab', { name: /الكلام إلى نص|Speech to Text/ }).click();
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(__dirname, '..', 'ie-stt.png') });

// mobile viewport
await page.setViewportSize({ width: 390, height: 900 });
await page.getByRole('tab', { name: /الوكيل الصوتي|Voice Agent/ }).click();
await page.waitForTimeout(500);
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(__dirname, '..', 'ie-mobile.png') });

await browser.close();
