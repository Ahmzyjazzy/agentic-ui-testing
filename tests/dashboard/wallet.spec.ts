import { expect, test } from "@playwright/test";

// source-intent: e2e/intents/dashboard/wallet-overview.intent.md
// Role and label locators only — nothing here breaks when a class is renamed.

async function signIn(page: import("@playwright/test").Page) {
  await page.goto("/auth/login");
  await page.getByLabel("Email").fill(process.env.TEST_HOST_EMAIL ?? "host@bookmi.test");
  await page
    .getByLabel("Password", { exact: true })
    .fill(process.env.TEST_HOST_PASSWORD ?? "password");
  await page.getByRole("button", { name: /^(sign in|log in)$/i }).click();
  await expect(page.getByRole("heading", { name: "Wallet overview" })).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await signIn(page);
});

test("shows the four wallet stat cards", async ({ page }) => {
  for (const label of [
    "Wallet balance",
    "Earnings - 30 days",
    "Bookings today",
    "Payout in transit",
  ]) {
    await expect(page.getByText(label, { exact: true })).toBeVisible();
  }
});

test("lists the recent bookings, newest first", async ({ page }) => {
  const rows = page.getByRole("row");
  // 5 bookings + the header row
  await expect(rows).toHaveCount(6);
  await expect(rows.nth(1)).toContainText("Chidi Nwosu");
});

test("wallet balance keeps moving", async ({ page }) => {
  const card = page.getByTestId("wallet-balance");
  const before = await card.innerText();
  await page.waitForTimeout(3500);
  expect(await card.innerText()).not.toBe(before);
});

test("host can log out", async ({ page }) => {
  await page.getByRole("button", { name: /log out/i }).click();
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
});
