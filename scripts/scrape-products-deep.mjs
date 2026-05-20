import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { createWriteStream } from "fs";
import https from "https";

const BASE = "https://stoneage-global.com";
const OUT = "/tmp/stoneage-scrape";
mkdirSync(OUT, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(dest); });
    }).on("error", reject);
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  });

  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(3000);

  // Accept cookies if present
  try {
    await page.click("button:has-text('I agree')", { timeout: 3000 });
    await page.waitForTimeout(1000);
  } catch {}

  // Scroll through entire page to trigger lazy loads
  await page.evaluate(async () => {
    for (let i = 0; i < 20; i++) {
      window.scrollBy(0, 600);
      await new Promise(r => setTimeout(r, 300));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2000);

  // Full page screenshot
  await page.screenshot({ path: `${OUT}/home-full.png`, fullPage: true });

  // Extract ALL text content organized by section
  const data = await page.evaluate(() => {
    const result = { sections: [], pdfs: [], images: [] };

    // Get all PDF links
    result.pdfs = [...document.querySelectorAll('a[href*=".pdf"]')]
      .map(a => ({ text: a.innerText.trim(), href: a.href }));

    // Get all image URLs
    result.images = [...document.querySelectorAll('img[src]')]
      .map(img => img.src)
      .filter(src => !src.includes('data:'));

    // Get sections
    const sections = document.querySelectorAll('section, article');
    sections.forEach(sec => {
      try {
        const id = sec.id || sec.className || "";
        const text = (sec.innerText || "").trim();
        if (text.length > 50) {
          result.sections.push({
            id,
            text: text.substring(0, 3000),
            headings: [...sec.querySelectorAll('h1,h2,h3,h4,h5')].map(h => (h.innerText || "").trim()).filter(Boolean),
          });
        }
      } catch(e) {}
    });

    // Full page text
    result.fullText = document.body.innerText;

    return result;
  });

  console.log("\n=== PDFs found ===");
  data.pdfs.forEach(p => console.log(p.text, "→", p.href));

  console.log("\n=== Images found ===");
  data.images.slice(0, 20).forEach(i => console.log(i));

  console.log("\n=== Sections ===");
  data.sections.forEach(s => {
    if (s.headings.length > 0) {
      console.log(`\n[${s.id}]`);
      console.log("Headings:", s.headings);
      console.log("Text:", s.text.substring(0, 500));
    }
  });

  // Full text for product research
  console.log("\n=== FULL PAGE TEXT ===");
  console.log(data.fullText.substring(0, 8000));

  // Download PDFs
  for (const pdf of data.pdfs) {
    if (!pdf.href) continue;
    const name = pdf.href.split("/").pop().split("?")[0];
    const dest = `${OUT}/${name}`;
    try {
      await download(pdf.href, dest);
      console.log(`Downloaded: ${dest}`);
    } catch (e) {
      console.log(`Failed PDF: ${pdf.href}: ${e.message}`);
    }
  }

  writeFileSync(`${OUT}/deep-data.json`, JSON.stringify(data, null, 2));

  await browser.close();
  console.log(`\nDone → ${OUT}/deep-data.json`);
})();
