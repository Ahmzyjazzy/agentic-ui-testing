# Step 3 — Intent instead of selectors

**Branch:** `step-3-intent` · **Time:** ~25 minutes · **Automation:** an agent that reads intent.

Step 2 ended with a red suite and a working app. Now we describe the same
journey as *intent* and let Antigravity CLI (powered by Gemini) carry it out.

## Prerequisites

```bash
# Antigravity CLI — macOS / Linux
curl -fsSL https://antigravity.google/cli/install.sh | bash
agy                      # first run signs you in with Google

# Playwright CLI + the skill that teaches the agent to use it
pnpm add -g @playwright/cli@latest
pnpm exec playwright install chromium chrome
mkdir -p ~/.gemini/skills
pnpm dlx degit microsoft/playwright-cli/skills/playwright-cli ~/.gemini/skills/playwright-cli
playwright-cli open https://playwright.dev --headed     # smoke test
```

Add headed mode to the skill so the agent knows it exists — in the `## Core`
section of `~/.gemini/skills/playwright-cli/SKILL.md`, right after the existing
`playwright-cli open` line:

```
# Run in headed mode so we can see the browser
playwright-cli open https://playwright.dev --headed
```

## Lab 1 — BrowserMCP, live in your Chrome

Set up per [browsermcp.md](browsermcp.md), then run the Lab 1 prompt from
[prompts.md](prompts.md).

**Do this while the UI is still broken** (`make break-ui` from step 2). The
hand-written suite can't find `button.btn-login-v2`; the agent signs in anyway,
because it looks for the button that signs you in.

BrowserMCP is a demo tool: it needs your open browser, it's Chromium-only, it
can't write files and it has no headless mode. Nothing in this repo depends on
it — that's the point of the next lab.

## Lab 2 — The Playwright skill

Disable BrowserMCP first (`/mcp` → `browsermcp` → Disable), then run the Lab 2a
(headless) and Lab 2b (headed) prompts. What changes:

- No browser needs to be open beforehand, and no extension
- Every run starts from a clean session
- The agent can save `output/dashboard.png`
- Reading the stat cards twice, three seconds apart, shows it coping with data
  that moves — the thing that makes scripted tests flaky

## Lab 3 — Intent files, checked into the repo

Prompts are fine on stage but they don't live anywhere. Intent files do:

```
e2e/intents/auth/login.intent.md
e2e/intents/auth/signup.intent.md
e2e/intents/dashboard/wallet-overview.intent.md
e2e/runner/contract.md          # output contract: the agent must write reports/<id>.result.json
e2e/runner/run-intents.sh       # loops over intents, sets an exit code
```

An intent file says *what* the user wants and *how you'd know it worked*:

```markdown
## Intent
Sign in to Bookmi as the demo host and land on the dashboard.

## Assertions
1. The sign-in page is reachable from the landing page without typing a URL
2. After signing in, the dashboard heading reads "Wallet overview"
...
```

Assertions must be checkable. "The dashboard looks fine" is what makes agent
tests flaky.

### Lab 3 — you generate the spec

**Nothing is generated for you on this branch.** `tests/` holds only the
hand-written specs from step 2; the generated ones are what you're about to
create. Run the Lab 3 prompt from [prompts.md](prompts.md):

```bash
agy -p "Read e2e/intents/auth/login.intent.md and create tests/auth/login.generated.spec.ts \
using getByRole/getByLabel locators — no CSS classes or ids. Run it with \
pnpm exec playwright test until it passes. Do not change any application code. \
Add a '// source-intent:' header naming the intent file."
```

Watch the file appear in your editor. What the agent wrote when this codelab was
built is kept in [docs/examples/login.generated.spec.ts.example](examples/login.generated.spec.ts.example)
as an answer key — compare yours against it. If the live run fails (no network,
agent having an off day), `make restore-generated` drops the reference specs
into `tests/` so the rest of the demo still works.

The generated spec looks like this:

```ts
await page.getByRole("link", { name: /^sign in$/i }).first().click();
await page.getByLabel("Email").fill(...);
await page.getByRole("button", { name: /^(sign in|log in)$/i }).click();
await expect(page.getByRole("heading", { name: "Wallet overview" })).toBeVisible();
```

### The six-command demo flow

```bash
make break-ui                                                  # 1. rename the classes
pnpm exec playwright test tests/auth/login.spec.ts             # 2. ✘ hand-written spec dies
cat e2e/intents/auth/login.intent.md                           # 3. the intent still holds

agy                                                            # 4. paste the Lab 3 prompt,
                                                               #    approve the tool calls
#    …or headless, which cannot prompt and so needs the flag:
#    agy -p "<Lab 3 prompt>" --dangerously-skip-permissions

pnpm exec playwright test tests/auth/login.generated.spec.ts   # 5. ✓ passes on the SAME broken UI
make restore-ui                                                # 6. put the UI back
```

**Permissions.** Interactive `agy` asks before it reads or writes a file. In
headless (`-p`) mode there is nobody to ask, so tools are auto-denied and you
get *"no output produced — a tool required the read_file permission"*. Add
`--dangerously-skip-permissions` (fine for this demo repo), or configure scoped
`permissions.allow` rules in `~/.gemini/antigravity-cli/settings.json` — with the
caveat that those are reported to be ignored in headless mode.

Step 4 is the one people came for: the file appears in the editor while they
watch. Have `make restore-generated` ready as a fallback if the agent stalls.

To show it rather than tell it, run either one with a visible browser:

```bash
make test-headed SLOWMO=600     # HEADED=1 + slow motion, one worker
make test-chrome                # same, in your installed Google Chrome
```

That pairs nicely with the headed agent prompt (Lab 2b): the agent drives one
browser, the generated spec drives another, and both do the same journey.

Roles and labels describe what the user sees, so a class rename doesn't touch
them. When a change *is* big enough to break the generated spec, you don't
debug selectors — you regenerate from the intent (Lab 3b prompt).

## Talking points

- Prompts are the demo; intent files are the deliverable.
- The agent is a *writer and fixer* of tests, not necessarily the runner.
- BrowserMCP sells the idea in 30 seconds; the Playwright skill makes it
  repeatable.

**Next:** [Step 4 — Intent in your pipeline](step-4-ci.md) (branch `main`).
