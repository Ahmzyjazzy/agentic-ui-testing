import { expect, test } from "@playwright/test";

/**
 * The test a team writes on day one. Every step is pinned to a CSS selector:
 * an implementation detail, not something the user cares about.
 *
 * Run `make break-ui` and watch this file fail while the app still works.
 */
test("host can sign in and reach the dashboard", async ({ page }) => {
  await page.goto("/");

  await page.click("a.nav-signin");
  await expect(page).toHaveURL(/\/auth\/login$/);

  await page.fill("#email", "host@bookmi.test");
  await page.fill("#password", "password");
  await page.click("button.btn-login-v2");

  await expect(page.locator("h1.dash-title")).toHaveText("Wallet overview");
});

test("wrong password is rejected", async ({ page }) => {
  await page.goto("/auth/login");

  await page.fill("#email", "host@bookmi.test");
  await page.fill("#password", "not-the-password");
  await page.click("button.btn-login-v2");

  await expect(page.locator("div.login-error")).toHaveText("Invalid email or password");
});
