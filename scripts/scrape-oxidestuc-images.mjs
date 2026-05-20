import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import https from "https";
import http from "http";
import { URL } from "url";

const OUT = "/tmp/oxidestuc-images";
mkdirSync(OUT, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === "https:" ? https : http;
    const file = require("fs").createWriteStream(dest);
    mod.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        "Referer": "https://stoneage-global.com/",
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(dest); });
    }).on("error", reject);
  });
}

import { createWriteStream } from "fs";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  });

  const results = { oxidestuc: [] };

  // Scrape Stone Age main page for all images
  const page = await ctx.newPage();
  await page.goto("https://stoneage-global.com", { waitUntil: "networkidle", timeout: 60000 });

  // Accept cookies
  try { await page.click("button:has-text('I agree')", { timeout: 3000 }); await page.waitForTimeout(1000); } catch {}

  // Scroll to load lazy images
  await page.evaluate(async () => {
    for (let i = 0; i < 15; i++) { window.scrollBy(0, 800); await new Promise(r => setTimeout(r, 400)); }
  });
  await page.waitForTimeout(2000);

  const allImages = await page.evaluate(() =>
    [...document.querySelectorAll("img[src]")]
      .map(img => ({ src: img.src, alt: img.alt || "", width: img.naturalWidth }))
      .filter(img => img.src.includes("cloudfront") || img.src.includes("stoneage"))
  );

  console.log("All images found:", allImages.length);

  // Filter for Oxidestuc-related images
  const oxidestucImgs = allImages.filter(img =>
    img.src.toLowerCase().includes("oxidestuc") ||
    img.alt.toLowerCase().includes("oxidestuc") ||
    img.alt.toLowerCase().includes("metal")
  );

  console.log("Oxidestuc images:", oxidestucImgs.length);
  oxidestucImgs.forEach(img => console.log(" ", img.src, "alt:", img.alt));

  // Also get all large product/environment images
  const envImgs = allImages.filter(img =>
    (img.src.includes("_productSlider") || img.src.includes("_landscapeLarge") || img.src.includes("_fullwidthLarge")) &&
    img.width > 400
  );

  console.log("\nEnvironment/product images:", envImgs.length);
  envImgs.forEach(img => console.log(" ", img.src));

  // Download Oxidestuc images
  const toDownload = [...oxidestucImgs, ...envImgs].slice(0, 20);

  for (const img of toDownload) {
    const filename = img.src.split("/").pop()?.split("?")[0] || "img.webp";
    const dest = `${OUT}/${filename}`;
    try {
      await download(img.src, dest);
      const size = (await import("fs")).statSync(dest).size;
      console.log(`Downloaded: ${filename} (${Math.round(size/1024)}KB)`);
    } catch (e) {
      console.log(`Failed: ${filename}: ${e.message}`);
    }
  }

  writeFileSync(`${OUT}/images.json`, JSON.stringify(toDownload, null, 2));
  await browser.close();
  console.log(`\nDone → ${OUT}/`);
})();
