import { expect, test } from "@playwright/test";

/**
 * The signup journey, written the same brittle way: ids and class names all
 * the way through. `make break-ui` breaks this one too.
 */
test("a new host can sign up and claim a page", async ({ page }) => {
  await page.goto("/");

  await page.click("a.nav-signin + a");
  await expect(page).toHaveURL(/\/auth\/signup$/);

  const email = `host-${Date.now()}@bookmi.test`;
  await page.fill("#fullName", "Ada Lovelace");
  await page.fill("#email", email);
  await page.fill("#password", "password123");
  await page.click("button.btn-signup-v2");

  // Onboarding suggests a slug from the display name
  await expect(page).toHaveURL(/\/onboarding$/);
  await expect(page.locator("#slug")).toHaveValue("ada-lovelace");

  await page.click("button.btn-claim-v2");
  await expect(page.locator("h1.dash-title")).toHaveText("Wallet overview");
});

test("a short password is rejected", async ({ page }) => {
  await page.goto("/auth/signup");

  await page.fill("#fullName", "Ada Lovelace");
  await page.fill("#email", "short@bookmi.test");
  await page.fill("#password", "short");
  await page.click("button.btn-signup-v2");

  await expect(page.locator("div.signup-error")).toContainText("at least 8 characters");
});
