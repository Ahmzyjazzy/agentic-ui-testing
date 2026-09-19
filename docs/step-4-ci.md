# Step 4 — Intent in your pipeline

**Branch:** `main` · **Time:** ~10 minutes · The part you take back to work.

The question every room asks after the demo: *nice, but how do I run this on
every pull request?*

## The model: intent is the source, code is the build output

```
login.intent.md          you write this with your feature
      ↓ agy generates
tests/auth/login.spec.ts you review it like any code
      ↓ commit both, push
CI: pnpm exec playwright test   no agent, no AI cost, same result every time
```

1. **You write the intent file** alongside the feature, in plain English with
   checkable assertions.
2. **The agent generates the spec — locally, before you push.** Role and label
   locators, run until green. (Lab 3 prompt in [prompts.md](prompts.md).)
3. **You commit both.** Reviewers see what you meant *and* what will run.
4. **CI runs plain Playwright.** Deterministic, fast, and it works on a machine
   with no Antigravity installed.
5. **When the UI changes a lot, regenerate** from the intent instead of hunting
   selectors.

The one rule: never hand-edit a generated spec and let it drift from its
intent. Change the intent, regenerate — the same discipline as any other
generated code.

## The PR workflow

`.github/workflows/e2e.yml`:

```yaml
- uses: pnpm/action-setup@v4
  with: { version: 10.15.0 }
- run: pnpm install --frozen-lockfile
- run: pnpm exec playwright install --with-deps chromium
- run: pnpm exec playwright test   # no agent, no AI cost
```

That's it. The agent never blocks a merge.

## What the run leaves behind

The job uploads `playwright-report/` as an artifact called **playwright-report**
(Actions run → *Artifacts* at the bottom). Because `CI` is set, the config turns
on video and traces, so the report is not just pass/fail — every test has a
`.webm` of the browser and a trace you can scrub action by action. Download it,
unzip, and open `index.html`.

That is also the honest answer to *"is the test really doing what I said?"*:
play the video from the intent's own test and watch it type into the form.

Locally you get the same thing with `make test-video && make report`.

## Regenerating the specs locally

The generation step above happens on your machine, not in CI. One intent at a
time is the stage version; the whole suite is one command:

```bash
make dev        # another terminal — the agent runs what it writes
make generate   # every intent → tests/<same path>.generated.spec.ts, then a test run
```

`scripts/generate-specs.sh` sends the Lab 3 prompt once per intent file
(`DRY_RUN=1` prints them without calling the agent, `INTENT=<path>` does one,
`VERIFY=0` skips the final Playwright run). Review the diff, commit intent and
spec together, and CI keeps running plain Playwright.

Do not confuse it with `e2e/runner/run-intents.sh` below: that one *executes*
intents with the agent and reports pass/fail, which is the nightly job — not the
thing that writes your specs.

## When you *do* want the agent in CI

Two good cases: a nightly smoke run of critical journeys against staging, and
an on-demand job that repairs a broken spec.

```bash
APP_URL=https://staging.example.com ./e2e/runner/run-intents.sh
```

The runner pins the agent's output shape with `e2e/runner/contract.md`, so CI
reads a file rather than chat text:

```json
{ "id": "auth-login-host", "status": "pass",
  "assertions": [{ "n": 1, "status": "pass", "reason": "Sign in link in the nav" }] }
```

Headless mode flags (see `agy --help` and the docs link below):

```bash
agy -p "$(cat e2e/runner/contract.md)

$(cat e2e/intents/auth/login.intent.md)" \
  --output-format json --print-timeout 10m --dangerously-skip-permissions
```

**Check these before you rely on it:**

- **Sign-in:** headless mode uses cached credentials, and the docs don't
  document an API key for CI. Plan how a runner authenticates.
- **Output:** there are reports of `-p` output going missing when stdout isn't a
  terminal — another reason the runner reads a result *file*.
- **Permissions:** there are reports of `permissions.allow` being ignored in
  headless mode.
- Keep agent jobs **non-blocking** until you've watched them for a few weeks.

## Which job runs when

| Cadence | What runs | Cost |
|---|---|---|
| Every PR | Generated Playwright specs | Free, seconds |
| Nightly | Agent runs the intent files against staging | Tokens, minutes |
| When a spec breaks | Regenerate from the intent | One prompt |

CI always runs headless — the headed switches (`HEADED`, `SLOWMO`, `BROWSER`)
are for your machine and the stage, and default to off, so nothing about them
reaches the pipeline.

Docs: https://antigravity.google/docs/cli/headless/
