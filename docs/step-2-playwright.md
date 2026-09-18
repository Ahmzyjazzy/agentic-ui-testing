# Step 2 — Playwright, the normal way

**Branch:** `step-2-playwright` · **Time:** ~15 minutes · **Automation:** hand-written scripts.

Manual testing doesn't scale, so we automate it the way most teams do: a
Playwright suite, written by hand, pinned to CSS selectors.

## Install

```bash
make install        # pnpm install — one workspace, root + demo-app
pnpm exec playwright install chromium
```

## What's in here

```
playwright.config.ts          # baseURL + webServer (boots the demo app for you)
tests/auth/login.spec.ts      # sign-in journey
tests/dashboard/wallet.spec.ts# dashboard cards, bookings table, drifting values
```

The login test is the one to read out loud:

```ts
await page.click("a.nav-signin");
await page.fill("#email", "host@bookmi.test");
await page.fill("#password", "password");
await page.click("button.btn-login-v2");
await expect(page.locator("h1.dash-title")).toHaveText("Wallet overview");
```

## Run it — green

```bash
make test        # or: pnpm exec playwright test
```

Five tests pass in a couple of seconds, headless, no clicking. This is a real
improvement over step 1 and worth saying so.

Watch it work if you like: `make test-headed`, or `make test-ui` for
Playwright's interactive runner.

## Now break it

A designer renames the login button's class and its label, and the dashboard
heading gets a new class. Nothing about the product changes for a user:

```bash
make break-ui
make test
```

```
✘ host can sign in and reach the dashboard
  TimeoutError: locator.click: Timeout 30000ms exceeded.
  waiting for locator('button.btn-login-v2')
```

Refresh the app in your browser: it works perfectly. Sign in by hand: it works.
**Nothing broke for the user — only the tests broke.**

Undo it when you're done:

```bash
make restore-ui
```

## Talking points

- The test knows `#email`, `button.btn-login-v2`, `h1.dash-title`. None of those
  are things a user cares about.
- Multiply one rename by 300 tests and you have a sprint of selector fixing.
- Flakiness has the same root: the test waits for *an element*, not for the
  *outcome* the user expects.
- Playwright's `getByRole` / `getByLabel` locators help a lot here — and they're
  exactly what the agent generates in step 3.

**Next:** [Step 3 — Intent](step-3-intent.md) (branch `step-3-intent`).
