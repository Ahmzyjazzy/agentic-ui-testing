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
tests/auth/signup.spec.ts     # signup + claim-your-page journey
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

The suite passes in a couple of seconds, headless, no clicking. This is a real
improvement over step 1 and worth saying so.

### Watching it work

Headless is right for CI, but on stage people want to see the browser:

| Command | What it does |
|---|---|
| `make test-headed` | Real browser window, one worker, 400ms between actions |
| `make test-headed SLOWMO=800` | Same, slower — good for a big room |
| `make test-chrome` | Drives your installed Google Chrome instead of bundled Chromium |
| `make test-ui` | Playwright's interactive runner, with time-travel debugging |
| `make test-debug` | Playwright Inspector — step through action by action |

Under the hood these are just environment variables the config reads, so you
can mix them yourself: `HEADED=1 SLOWMO=1000 pnpm exec playwright test tests/auth`.

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

Want the room to *see* it fail? Run the broken suite headed:

```bash
make test-headed SLOWMO=600
```

The browser opens, fills the form, and then sits there waiting for a button
that no longer has that class until Playwright times out.

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
