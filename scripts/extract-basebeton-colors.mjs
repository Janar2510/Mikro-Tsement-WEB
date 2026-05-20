import { chromium } from "playwright";
import { createCanvas, loadImage } from "canvas";
import { writeFileSync } from "fs";
import { createRequire } from "module";

const PDF_URL =
  "https://d1bq1om7zcq6qf.cloudfront.net/stoneage-worldwide/Basebeton-Originale_Samplecard-2024.pdf";

// RGB -> hex
function toHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

// Sample a region of a screenshot buffer and return average color
async function avgColor(imageBuffer, x, y, w, h) {
  const img = await loadImage(imageBuffer);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(x, y, w, h).data;
  let r = 0, g = 0, b = 0, count = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
  }
  return toHex(r / count, g / count, b / count);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load PDF in browser — Chromium renders PDFs natively
  await page.goto(PDF_URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(3000); // let PDF render fully

  // Take full-page screenshot of each page
  const screenshots = [];
  let pageNum = 1;

  while (true) {
    const shot = await page.screenshot({ fullPage: false });
    screenshots.push({ page: pageNum, buffer: shot });
    writeFileSync(`/tmp/basebeton-page-${pageNum}.png`, shot);
    console.log(`Saved page ${pageNum} screenshot`);

    // Try to scroll to next page
    const prevHeight = await page.evaluate(() => window.scrollY);
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(500);
    const newHeight = await page.evaluate(() => window.scrollY);
    if (newHeight === prevHeight || pageNum >= 10) break;
    pageNum++;
  }

  console.log(`\nTotal pages screenshotted: ${screenshots.length}`);
  console.log("Screenshots saved to /tmp/basebeton-page-N.png");
  console.log("Inspect them to identify swatch grid coordinates, then run color extraction.");

  await browser.close();
})();
