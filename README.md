# Agentic UI Testing — an intent-driven testing codelab

**From brittle selectors to intent: Automated UI testing with Antigravity CLI, BrowserMCP
and Playwright.**

This repo is the hands-on companion to the talk. The app under test is a demo
build of **Bookmi by Qorelly** — a shareable link where anyone can book and pay
for your services. No backend at all: landing → sign up → claim your page → dashboard,
plus sign in for the seeded host.

![Landing, sign up, claim your page, dashboard](docs/screenshots/flow.png)

<sub>Landing → sign up → claim your page → dashboard. The full landing page is in
[docs/screenshots/landing-full.png](docs/screenshots/landing-full.png).</sub>

> Everything here is fake by design: credentials live in
> `demo-app/src/data/credentials.json`, dashboard numbers in
> `demo-app/src/data/seed.ts`. No API, no database, no payments.

---

## The codelab in four steps

Each step is a branch. Check one out and everything you need for that step is
there — code, README, docs.

| Step | Branch              | You will                                                                 | Docs                                              |
| ---- | ------------------- | ------------------------------------------------------------------------ | ------------------------------------------------- |
| 1    | `step-1-manual`     | Test the login journey by hand and feel the repetition                   | [step-1-manual.md](docs/step-1-manual.md)         |
| 2    | `step-2-playwright` | Write a normal Playwright suite, then break it with one rename           | [step-2-playwright.md](docs/step-2-playwright.md) |
| 3    | `step-3-intent`     | Run the same journey as _intent_ — BrowserMCP, then the Playwright skill | [step-3-intent.md](docs/step-3-intent.md)         |
| 4    | `main`              | Put intent files in your pipeline                                        | [step-4-ci.md](docs/step-4-ci.md)                 |

`main` is the finished setup: the app, intent files, generated specs, the CI
workflow and all the docs.

---

## Quick start

```bash
git clone <this repo> agentic-ui-testing
cd agentic-ui-testing
make install                 # pnpm install — one workspace (root + demo-app)
pnpm exec playwright install chromium
make dev                     # http://localhost:5173
```

Sign in with **`host@bookmi.test`** / **`password`**.

Run the suite (it starts the app itself):

```bash
make test
```

---

## The demo steps:

```bash
# Step 1 — no automation at all
git checkout step-1-manual && make dev
# click through docs/step-1-manual.md by hand

# Step 2 — the normal way, then break it
git checkout step-2-playwright
make test                    # green
make break-ui                # renames .btn-login-v2, .nav-signin, .dash-title
make test                    # red — but the app still works for humans

# Step 3 — intent, while the UI is still broken
git checkout step-3-intent
agy                          # paste the Lab 1 / Lab 2 prompts from docs/prompts.md
pnpm exec playwright test tests/auth/login.generated.spec.ts   # role-based: green
make restore-ui

# Step 4 — the pipeline
git checkout main
cat docs/step-4-ci.md
```

---

## Prerequisites

- **Node.js 20.19+**, **pnpm 10+** (`corepack enable && corepack prepare pnpm@10.15.0 --activate`), **Git**, **Chrome**
- macOS, Linux, or Windows via **WSL**
- For step 3: **Antigravity CLI** and a Google account

```bash
# Antigravity CLI (macOS / Linux)
curl -fsSL https://antigravity.google/cli/install.sh | bash
agy                                   # first run signs you in

# Playwright CLI + the skill that teaches the agent to drive it
pnpm add -g @playwright/cli@latest
pnpm exec playwright install chromium chrome
mkdir -p ~/.gemini/skills
pnpm dlx degit microsoft/playwright-cli/skills/playwright-cli ~/.gemini/skills/playwright-cli
```

BrowserMCP setup for the live demo: [docs/browsermcp.md](docs/browsermcp.md).

---

## What's in `main`

```
demo-app/                     Vite + React app (Bookmi design system, hardcoded auth)
  src/data/credentials.json   the "auth backend"
  src/data/seed.ts            dashboard numbers
tests/                        Playwright specs, generated from the intents (login, signup, dashboard)
e2e/intents/                  intent files — what to test, in plain English
e2e/runner/                   output contract + runner for agent-driven runs
scripts/break-ui.sh           rename the classes selector-based tests depend on
docs/                         one doc per step, prompts, troubleshooting
docs/examples/                the original selector-based specs, for contrast
.github/workflows/e2e.yml     CI: plain Playwright, no agent
mcp_config.example.json       BrowserMCP config (demo only, not used by the app)
```

### Commands

| Command                             | What it does                                             |
| ----------------------------------- | -------------------------------------------------------- |
| `make install`                      | Install everything (`pnpm install` across the workspace) |
| `make dev`                          | Run the app on http://localhost:5173                     |
| `make test`                         | Run the Playwright suite (boots the app itself)          |
| `make test-headed` | Watch it run in a real browser, slowed down (`SLOWMO=800` to go slower) |
| `make test-chrome` | Same, driving your installed Google Chrome |
| `make test-ui` / `make test-debug` | Playwright's interactive runner / the Inspector |
| `make break-ui` / `make restore-ui` | Break and repair the selector-based tests                |
| `./e2e/runner/run-intents.sh`       | Run every intent file through `agy` (needs Antigravity)  |

---

## The idea in one paragraph

A hand-written Playwright test knows `#email`, `button.btn-login-v2` and
`h1.dash-title` — implementation details. Rename a class and the test breaks
while the product is fine. An intent file says _"sign in as the host and check
the dashboard heading reads Wallet overview"_, which stays true through
redesigns. Antigravity CLI can execute that intent directly (great for demos and
nightly smoke runs) or turn it into an ordinary Playwright spec using role and
label locators — which is what runs on every pull request, with no agent and no
AI cost.

---

## Credits

- Talk and repo: Ahmed Olanrewaju
- Demo app design: [Bookmi by Qorelly](https://qorelly.com)
- Inspired by the Google codelab
  [Automated UI testing with Antigravity](https://codelabs.developers.google.com/agentic-ui-automation-with-antigravity)
  by Darren "Dazbo" Lester (CC BY 4.0)
- [Antigravity CLI](https://antigravity.google/docs/cli/install) ·
  [BrowserMCP](https://docs.browsermcp.io) ·
  [Playwright](https://playwright.dev)
