# Step 1 — Testing by hand

You are on the **`step-1-manual`** branch of the Bookmi UI testing codelab.
There is no test tooling here at all: just the app, and you.

```bash
make install
make dev          # http://localhost:5173
```

Sign in with `host@bookmi.test` / `password`.

Then work through the manual checklist in **[docs/step-1-manual.md](docs/step-1-manual.md)**.

## Branches in this codelab

| Branch | What it adds |
|---|---|
| `step-1-manual` | The app only — test it by hand |
| `step-2-playwright` | Hand-written Playwright tests with CSS selectors, and a script that breaks them |
| `step-3-intent` | The same tests written as intent, run by Antigravity CLI (BrowserMCP + Playwright skill) |
| `main` | The final setup: intent files, generated specs, CI workflow, full guide |

Full walkthrough: `git checkout main` and read the README there.
