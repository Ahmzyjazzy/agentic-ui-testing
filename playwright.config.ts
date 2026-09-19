import { defineConfig, devices } from "@playwright/test";

/**
 * Standard Playwright setup. `webServer` boots the demo app, so
 * `pnpm exec playwright test` is the only command anyone (or any CI job) needs.
 *
 * Watching the run during a demo:
 *   HEADED=1            open a real browser window instead of running headless
 *   SLOWMO=600          milliseconds to pause between actions (default 400 when headed)
 *   BROWSER=chrome      drive your installed Google Chrome instead of bundled Chromium
 *   PWDEBUG=1           Playwright Inspector: step through action by action
 *   VIDEO=1             record a .webm of every test, even when it passes
 *
 * The Makefile wraps these: `make test-headed`, `make test-chrome`, `make test-debug`.
 */
const headed = process.env.HEADED === "1" || process.env.HEADED === "true";
const slowMo = Number(process.env.SLOWMO ?? (headed ? 400 : 0));

// Record video for every test in CI, so the uploaded report is something you can
// watch, and locally whenever you ask for it: `make test VIDEO=1`. Headed runs
// skip it — you are already watching the browser.
const video = !headed && (process.env.VIDEO === "1" || !!process.env.CI) ? "on" : "off";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: !headed, // one action at a time is easier to follow on stage
  workers: headed ? 1 : undefined,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: process.env.APP_URL ?? "http://localhost:5173",
    headless: !headed,
    launchOptions: { slowMo },
    // Always trace: UI mode and the trace viewer need one locally, and in CI the
    // HTML report ships a per-test timeline you can scrub through after the fact.
    trace: "on",
    screenshot: "only-on-failure",
    video,
  },
  projects: [
    {
      name: process.env.BROWSER === "chrome" ? "chrome" : "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(process.env.BROWSER === "chrome" ? { channel: "chrome" } : {}),
      },
    },
  ],
  webServer: {
    command: "pnpm --filter bookmi-demo-app dev",
    url: process.env.APP_URL ?? "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
