/**
 * Open Graph image (1200×630): a capture of the first screen of the built site, in light mode.
 *
 *   bun run build && bun run og [out]   defaults to public/og.png
 */
import { join, resolve } from "node:path";
import { chromium } from "playwright";

const ROOT = join(import.meta.dir, "..");
const PORT = 4331;
const out = resolve(process.argv[2] ?? join(ROOT, "public", "og.png"));

const server = Bun.spawn(["bunx", "astro", "preview", "--port", String(PORT)], { cwd: ROOT, stdout: "ignore", stderr: "ignore" });

async function waitForServer(url: string, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // Not listening yet.
    }
    await Bun.sleep(250);
  }
  throw new Error(`Preview server did not start on ${url}. Run \`bun run build\` first.`);
}

const browser = await chromium.launch({ channel: "chrome" });
try {
  const url = `http://localhost:${PORT}/`;
  await waitForServer(url);
  const context = await browser.newContext({
    // A narrower viewport scaled up to 1200×630, so the hero reads at thumbnail size.
    viewport: { width: 880, height: 462 },
    deviceScaleFactor: 1200 / 880,
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out });
  console.log(out);
} finally {
  await browser.close();
  server.kill();
}
