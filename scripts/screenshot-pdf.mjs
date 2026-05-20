import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";

const PDF_URL =
  "https://d1bq1om7zcq6qf.cloudfront.net/stoneage-worldwide/Basebeton-Originale_Samplecard-2024.pdf";

const OUT_DIR = "/tmp/basebeton";

(async () => {
  mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
  });
  const page = await context.newPage();

  console.log("Loading PDF…");
  await page.goto(PDF_URL, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(4000);

  // Chrome PDF viewer — zoom out for full page view
  await page.keyboard.press("Control+-");
  await page.keyboard.press("Control+-");
  await page.waitForTimeout(500);

  let saved = 0;
  let prevY = -1;

  for (let i = 0; i < 20; i++) {
    const buf = await page.screenshot({ fullPage: false });
    const path = `${OUT_DIR}/page-${String(i + 1).padStart(2, "0")}.png`;
    writeFileSync(path, buf);
    console.log(`Saved ${path}`);
    saved++;

    // Scroll down one viewport
    const y = await page.evaluate(() => window.scrollY);
    if (y === prevY && i > 0) break;
    prevY = y;
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(600);
  }

  console.log(`\nDone. ${saved} screenshots in ${OUT_DIR}/`);
  await browser.close();
})();
