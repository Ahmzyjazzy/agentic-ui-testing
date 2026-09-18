import { expect, test } from "@playwright/test";

// source-intent: e2e/intents/auth/signup.intent.md
// Generated from the intent — role and label locators, no ids or classes.
test("a new host can sign up and claim a page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /get started/i }).first().click();

  await page.getByLabel("Your name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill(`host-${Date.now()}@bookmi.test`);
  await page.getByLabel("Password", { exact: true }).fill("password123");
  await page.getByRole("button", { name: /create your page/i }).click();

  await expect(page.getByRole("heading", { name: "Claim your page" })).toBeVisible();
  await expect(page.getByLabel("Your Bookmi link")).toHaveValue("ada-lovelace");

  await page.getByRole("button", { name: /claim page/i }).click();
  await expect(page.getByRole("heading", { name: "Wallet overview" })).toBeVisible();
});
