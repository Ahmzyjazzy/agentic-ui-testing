import { expect, test } from "@playwright/test";

/** Same brittle style: the dashboard assertions hang off class names too. */
test.beforeEach(async ({ page }) => {
  await page.goto("/auth/login");
  await page.fill("#email", "host@bookmi.test");
  await page.fill("#password", "password");
  await page.click("button.btn-login-v2");
  await expect(page.locator("h1.dash-title")).toBeVisible();
});

test("shows four telemetry cards with values", async ({ page }) => {
  const cards = page.locator(".stat-card");
  await expect(cards).toHaveCount(4);

  for (const value of await page.locator(".stat-card .stat-value").allInnerTexts()) {
    expect(value.trim()).not.toBe("");
  }
});

test("lists the recent bookings", async ({ page }) => {
  const rows = page.locator('[data-testid="recent-bookings"] tbody tr');
  await expect(rows).toHaveCount(5);
  await expect(rows.first()).toContainText("Chidi Nwosu");
});

test("stat values drift while you watch", async ({ page }) => {
  const wallet = page.locator('[data-testid="wallet-balance"] .stat-value');
  const before = await wallet.innerText();
  await page.waitForTimeout(3500);
  const after = await wallet.innerText();
  expect(after).not.toBe(before);
});
