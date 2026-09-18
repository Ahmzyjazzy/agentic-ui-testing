# Step 1 — Testing by hand

You are on the **`step-1-manual`** branch of the Bookmi UI testing codelab.
There is no test tooling here at all: just the app, and you.

![Landing, sign up, claim your page, dashboard](docs/screenshots/flow.png)

<sub>The app you'll be testing: landing → sign up → claim your page → dashboard.</sub>

## The demo steps:

No automation on this branch — you are the test runner.

**1. Start the app.**

```bash
make install
make dev          # http://localhost:5173
```

**2. Walk the journey by hand.** Landing → **Get started** → sign up → claim
your page → dashboard. Then log out and sign back in with the seeded host,
`host@bookmi.test` / `password`.

**3. Check every item** on the release checklist in
[docs/step-1-manual.md](docs/step-1-manual.md) — the four stat cards, the five
booking rows, the heading that reads "Wallet overview".

**4. Now do it again.** And again next release, on another browser. That
repetition is the point of this step: it is slow, boring, and easy to skip
under pressure.

## Branches in this codelab

| Branch | What it adds |
|---|---|
| `step-1-manual` | The app only — test it by hand |
| `step-2-playwright` | Hand-written Playwright tests with CSS selectors, and a script that breaks them |
| `step-3-intent` | The same tests written as intent, run by Antigravity CLI (BrowserMCP + Playwright skill) |
| `main` | The final setup: intent files, generated specs, CI workflow, full guide |

Full walkthrough: `git checkout main` and read the README there.
