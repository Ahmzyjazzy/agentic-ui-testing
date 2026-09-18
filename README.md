# Step 2 — Playwright, the normal way

You are on the **`step-2-playwright`** branch. The app is the same as step 1;
what's new is a hand-written Playwright suite that depends on CSS selectors.

![Landing, sign up, claim your page, dashboard](docs/screenshots/flow.png)

<sub>The app you'll be testing: landing → sign up → claim your page → dashboard.</sub>

## The demo steps:

**1. Install and run the suite.** Five hand-written specs, green in seconds.

```bash
make install                        # pnpm install (workspace: root + demo-app)
pnpm exec playwright install chromium
make test                           # green, headless
make test-headed SLOWMO=600         # or watch it in a real browser
```

**2. Read the login spec out loud.** Every step is pinned to a CSS selector:
`#email`, `button.btn-login-v2`, `h1.dash-title`.

```bash
cat tests/auth/login.spec.ts
```

**3. Break the UI.** A designer renames three classes and a button label.
Nothing changes for a human using the app — check it in the browser.

```bash
make break-ui
```

**4. Run the suite again.** Red, on a timeout waiting for a button that is
right there on screen.

```bash
make test                           # ✘ waiting for locator('button.btn-login-v2')
make test-headed SLOWMO=600         # watch it sit there and give up
```

**5. Put the UI back.**

```bash
make restore-ui
```

Full walkthrough: **[docs/step-2-playwright.md](docs/step-2-playwright.md)**.

## Branches in this codelab

| Branch | What it adds |
|---|---|
| `step-1-manual` | The app only — test it by hand |
| `step-2-playwright` | Hand-written Playwright tests with CSS selectors, and a script that breaks them |
| `step-3-intent` | The same tests written as intent, run by Antigravity CLI (BrowserMCP + Playwright skill) |
| `main` | The final setup: intent files, generated specs, CI workflow, full guide |
