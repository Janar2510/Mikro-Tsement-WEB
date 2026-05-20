import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";

const BASE = "https://stoneage-global.com";
const OUT = "/tmp/stoneage-scrape";
mkdirSync(OUT, { recursive: true });

const results = {};

async function scrape() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  });

  // ── Home + FAQ ────────────────────────────────────────────────────────
  console.log("Scraping home…");
  const home = await ctx.newPage();
  await home.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await home.waitForTimeout(2000);
  await home.screenshot({ path: `${OUT}/home.png`, fullPage: true });

  results.home = await home.evaluate(() => {
    const getText = (sel) => [...document.querySelectorAll(sel)].map(e => e.innerText.trim()).filter(Boolean);
    return {
      navLinks: getText("nav a"),
      headings: getText("h1, h2, h3"),
      paragraphs: getText("p"),
    };
  });

  // ── All internal links ────────────────────────────────────────────────
  const links = await home.evaluate(() =>
    [...document.querySelectorAll("a[href]")]
      .map(a => a.href)
      .filter(h => h.includes("stoneage-global.com") || h.startsWith("/"))
      .filter((v, i, a) => a.indexOf(v) === i)
  );
  console.log("Found links:", links.slice(0, 30));
  results.links = links;

  // ── Product pages ─────────────────────────────────────────────────────
  const productPaths = links.filter(l =>
    l.includes("/product") || l.includes("/basebeton") ||
    l.includes("/oxidestuc") || l.includes("/sichtbeton") ||
    l.includes("/stuccopuro") || l.includes("/microcement")
  );
  console.log("Product paths:", productPaths);

  results.products = {};

  for (const url of [...new Set([...productPaths, BASE + "/products", BASE + "/basebeton", BASE + "/basebeton-originale"])]) {
    try {
      console.log(`Scraping: ${url}`);
      const pg = await ctx.newPage();
      await pg.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await pg.waitForTimeout(1500);

      const slug = url.replace(BASE, "").replace(/\//g, "-").replace(/^-/, "") || "index";
      await pg.screenshot({ path: `${OUT}/${slug}.png`, fullPage: true });

      const data = await pg.evaluate(() => {
        const getText = (sel) => [...document.querySelectorAll(sel)].map(e => e.innerText.trim()).filter(Boolean);
        const getTables = () => [...document.querySelectorAll("table")].map(t => t.innerText);
        const getLists = () => [...document.querySelectorAll("ul, ol")].map(l => l.innerText);
        return {
          url: window.location.href,
          title: document.title,
          headings: getText("h1,h2,h3,h4"),
          paragraphs: getText("p"),
          lists: getLists(),
          tables: getTables(),
          allText: document.body.innerText.substring(0, 8000),
        };
      });

      results.products[slug] = data;
      await pg.close();
    } catch (e) {
      console.log(`Failed ${url}: ${e.message}`);
    }
  }

  // ── FAQ page ─────────────────────────────────────────────────────────
  try {
    console.log("Scraping FAQ…");
    const faq = await ctx.newPage();
    await faq.goto(`${BASE}/#faq`, { waitUntil: "networkidle", timeout: 30000 });
    await faq.waitForTimeout(2000);
    await faq.screenshot({ path: `${OUT}/faq.png`, fullPage: true });
    results.faq = await faq.evaluate(() => ({
      text: document.body.innerText.substring(0, 10000),
      headings: [...document.querySelectorAll("h1,h2,h3,h4,h5")].map(e => e.innerText.trim()),
    }));
    await faq.close();
  } catch (e) {
    console.log(`FAQ failed: ${e.message}`);
  }

  // ── Sitemap / search for product details ─────────────────────────────
  const extraPages = [
    "/products", "/basebeton-originale", "/oxidestuc", "/sichtbeton",
    "/stuccopuro", "/microbeton", "/products/basebeton",
    "/en/products", "/products/microcement",
  ];

  for (const path of extraPages) {
    const url = BASE + path;
    if (results.products[path.replace(/\//g, "-").replace(/^-/, "")]) continue;
    try {
      console.log(`Trying: ${url}`);
      const pg = await ctx.newPage();
      await pg.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      await pg.waitForTimeout(1000);
      const data = await pg.evaluate(() => ({
        url: window.location.href,
        status: document.title,
        text: document.body.innerText.substring(0, 5000),
        headings: [...document.querySelectorAll("h1,h2,h3")].map(e => e.innerText.trim()),
      }));
      const slug = path.replace(/\//g, "-").replace(/^-/, "");
      results.products[slug] = data;
      await pg.close();
    } catch (e) {
      // ignore 404s
    }
  }

  await browser.close();

  writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 2));
  console.log(`\nScrape complete → ${OUT}/results.json`);
  console.log(`Screenshots → ${OUT}/`);
}

scrape().catch(console.error);
