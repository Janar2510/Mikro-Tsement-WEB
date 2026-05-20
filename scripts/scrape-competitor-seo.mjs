import { chromium } from "playwright";
import { writeFileSync } from "fs";

const URL = "https://mikrotsement.ee";
const OUT = "/tmp/competitor-seo.json";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36" });
  const results = { pages: [] };

  const pagesToVisit = [
    URL,
    URL + "/mikrotsement",
    URL + "/tootlemine",
    URL + "/galerii",
    URL + "/kontakt",
    URL + "/teenused",
    URL + "/hind",
    URL + "/et",
  ];

  for (const pageUrl of pagesToVisit) {
    try {
      const page = await ctx.newPage();
      await page.goto(pageUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
      await page.waitForTimeout(1000);

      const data = await page.evaluate(() => {
        const get = (sel) => document.querySelector(sel)?.textContent?.trim() || "";
        const getAttr = (sel, attr) => document.querySelector(sel)?.getAttribute(attr) || "";
        const getAll = (sel) => [...document.querySelectorAll(sel)].map(e => e.textContent?.trim()).filter(Boolean);
        const getAllAttr = (sel, attr) => [...document.querySelectorAll(sel)].map(e => e.getAttribute(attr)).filter(Boolean);

        return {
          url: window.location.href,
          title: document.title,
          metaDesc: getAttr('meta[name="description"]', "content"),
          metaKeywords: getAttr('meta[name="keywords"]', "content"),
          ogTitle: getAttr('meta[property="og:title"]', "content"),
          ogDesc: getAttr('meta[property="og:description"]', "content"),
          ogImage: getAttr('meta[property="og:image"]', "content"),
          h1: getAll("h1"),
          h2: getAll("h2"),
          h3: getAll("h3").slice(0, 20),
          links: getAllAttr("a[href]", "href").filter(h => h.startsWith("/") || h.includes("mikrotsement")).slice(0, 40),
          wordCount: document.body.innerText.split(/\s+/).length,
          lang: document.documentElement.lang,
          canonical: getAttr('link[rel="canonical"]', "href"),
          schemaTypes: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { return JSON.parse(s.textContent)["@type"]; } catch { return null; } }).filter(Boolean),
          bodyText: document.body.innerText.substring(0, 3000),
          navLinks: [...document.querySelectorAll("nav a, header a")].map(a => ({ text: a.textContent?.trim(), href: a.getAttribute("href") })).filter(l => l.text),
          altTexts: getAllAttr("img[alt]", "alt").filter(Boolean).slice(0, 20),
        };
      });

      results.pages.push(data);
      await page.close();
      console.log(`✓ ${pageUrl} — title: "${data.title}"`);
    } catch (e) {
      console.log(`✗ ${pageUrl}: ${e.message}`);
    }
  }

  await browser.close();
  writeFileSync(OUT, JSON.stringify(results, null, 2));
  console.log(`\nSaved → ${OUT}`);
})();
