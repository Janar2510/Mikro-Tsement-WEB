import { chromium } from "playwright";
import { writeFileSync, mkdirSync, copyFileSync } from "fs";
import path from "path";

const OUT = "/tmp/stoneage-pdfs";
const DEST = "/Users/janarkuusk/Microcement. web/public/assets/datasheets";
mkdirSync(OUT, { recursive: true });
mkdirSync(DEST, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    acceptDownloads: true,
  });

  const page = await ctx.newPage();
  await page.goto("https://stoneage-global.com", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000);

  // Accept cookies
  try { await page.click("button:has-text('I agree')", { timeout: 3000 }); await page.waitForTimeout(1000); } catch {}

  // Get all PDF link elements
  const pdfLinks = await page.evaluate(() =>
    [...document.querySelectorAll('a[href*=".pdf"]')]
      .map(a => ({ text: a.innerText.trim(), href: a.href }))
      .filter((v, i, arr) => arr.findIndex(x => x.href === v.href) === i)
  );

  console.log(`Found ${pdfLinks.length} PDF links`);

  const downloaded = [];

  for (const link of pdfLinks) {
    if (link.href.includes("Cookie") || link.href.includes("Magazine")) continue;

    console.log(`Downloading: ${link.text} → ${link.href}`);
    try {
      const [download] = await Promise.all([
        ctx.waitForEvent("download", { timeout: 30000 }),
        page.evaluate((url) => {
          const a = document.createElement("a");
          a.href = url;
          a.click();
        }, link.href),
      ]);

      const suggested = download.suggestedFilename();
      const tmpPath = await download.path();
      const dest = path.join(OUT, suggested);
      copyFileSync(tmpPath, dest);
      console.log(`  → Saved: ${dest} (${(require("fs").statSync(dest).size / 1024).toFixed(0)} KB)`);

      // Also copy to public assets (skip privacy/cookie PDFs)
      if (!suggested.includes("Cookie") && !suggested.includes("Magazine")) {
        const publicDest = path.join(DEST, suggested);
        copyFileSync(dest, publicDest);
        downloaded.push({ name: link.text, file: suggested, href: link.href });
      }
    } catch (e) {
      console.log(`  FAILED: ${e.message}`);
    }
  }

  writeFileSync(`${OUT}/downloaded.json`, JSON.stringify(downloaded, null, 2));
  console.log(`\nDone. Downloaded ${downloaded.length} datasheets to ${DEST}`);
  await browser.close();
})();
