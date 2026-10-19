/**
 * First-screen captures of the projects for the Projects section.
 * Run with `bun run screenshots`. Uses the locally installed Google Chrome (no browser download).
 * Output: src/assets/projects/<name>.png at 1440×900, deviceScaleFactor 2.
 */
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium, type Page } from "playwright";

interface Target {
  name: string;
  /** Tried in order; the first that answers 2xx is captured. */
  urls: string[];
}

const TARGETS: Target[] = [
  { name: "coecaribe", urls: ["https://www.coecaribe.com/"] },
  { name: "pokedata", urls: ["https://pokedata-pied.vercel.app/en", "https://pokedata-pied.vercel.app/es"] },
];

const OUT_DIR = join(import.meta.dir, "..", "src", "assets", "projects");
const VIEWPORT = { width: 1440, height: 900 };
const NAVIGATION_TIMEOUT_MS = 45_000;

// Hidden rather than accepted: the capture should not give consent on anyone's behalf.
const HIDE_OVERLAYS_CSS = `
  #onetrust-consent-sdk, #onetrust-banner-sdk, #CybotCookiebotDialog, .cc-window, .cc-banner,
  .cookie-banner, .cookies-banner, #cookie-banner, #cookie-notice, .cookie-notice, #cookie-law-info-bar,
  .cky-consent-container, .cmplz-cookiebanner, #usercentrics-root, .qc-cmp2-container, #didomi-host,
  [id*="cookie" i][role="dialog"], [class*="cookie" i][role="dialog"],
  [id*="consent" i][role="dialog"], [class*="consent" i][role="dialog"],
  [aria-modal="true"], [class*="popup" i][class*="overlay" i], [class*="modal-backdrop" i],
  #hubspot-messages-iframe-container, .intercom-lightweight-app, #crisp-chatbox, .tawk-min-container,
  iframe[title*="chat" i] {
    display: none !important;
  }
  html, body { overflow: auto !important; }
`;

const IMAGES_TIMEOUT_MS = 10_000;

async function settle(page: Page) {
  console.log("  waiting for network…");
  await page.waitForLoadState("networkidle", { timeout: NAVIGATION_TIMEOUT_MS }).catch(() => {
    console.warn("  network never went idle, continuing");
  });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: HIDE_OVERLAYS_CSS });
  await page.keyboard.press("Escape").catch(() => {});
  // Catch-all for banners and chat bubbles the selectors miss: anything fixed or sticky that sits
  // in the lower part of the viewport floats over the page. Top bars (the site header) stay.
  const hidden = await page.evaluate(() => {
    let count = 0;
    for (const element of document.querySelectorAll<HTMLElement>("body *")) {
      const { position } = getComputedStyle(element);
      if (position !== "fixed" && position !== "sticky") continue;
      const rect = element.getBoundingClientRect();
      if (rect.height === 0 || rect.top < window.innerHeight * 0.3) continue;
      element.style.setProperty("display", "none", "important");
      count++;
    }
    return count;
  });
  if (hidden) console.log(`  hid ${hidden} floating element(s)`);
  // Images in the first screen, capped: a broken or never-ending image must not hang the run.
  await page.evaluate(
    (timeout) =>
      Promise.race([
        Promise.all(
          [...document.images]
            .filter((img) => img.getBoundingClientRect().top < window.innerHeight && !img.complete)
            .map(
              (img) =>
                new Promise((resolve) => {
                  img.addEventListener("load", resolve, { once: true });
                  img.addEventListener("error", resolve, { once: true });
                }),
            ),
        ),
        new Promise((resolve) => setTimeout(resolve, timeout)),
      ]),
    IMAGES_TIMEOUT_MS,
  );
  // Late layout shifts.
  await page.waitForTimeout(1_000);
}

async function capture(page: Page, target: Target): Promise<string> {
  for (const url of target.urls) {
    console.log(`  opening ${url}`);
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: NAVIGATION_TIMEOUT_MS }).catch(() => null);
    if (!response || !response.ok()) {
      console.warn(`  ${url} → ${response ? response.status() : "no response"}, trying next`);
      continue;
    }
    await settle(page);
    const path = join(OUT_DIR, `${target.name}.png`);
    await page.screenshot({ path, fullPage: false });
    return `${url} → ${path}`;
  }
  throw new Error(`No URL answered for ${target.name}`);
}

const browser = await chromium.launch({ channel: "chrome" });
try {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: "light",
    // Entrance animations land on their final frame.
    reducedMotion: "reduce",
    locale: "en-US",
  });
  const page = await context.newPage();
  await mkdir(OUT_DIR, { recursive: true });

  let failed = false;
  for (const target of TARGETS) {
    try {
      console.log(`${target.name}: ${await capture(page, target)}`);
    } catch (error) {
      failed = true;
      console.error(`${target.name}: ${String(error)}`);
    }
  }
  if (failed) process.exitCode = 1;
} finally {
  await browser.close();
}
