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
- id: run-tests
  run: pnpm exec playwright test   # no agent, no AI cost
- uses: actions/upload-artifact@v4  # the report, as a zip
- uses: grafana/plugin-actions/playwright-gh-pages/upload-report-artifacts@main
# …and a second job publishes the same report to GitHub Pages
```

That's it. The agent never blocks a merge.

## What the run leaves behind

Because `CI` is set, `playwright.config.ts` records a video and a trace for
every test, so the report is not just pass/fail — you can watch the browser do
the journey and scrub the trace action by action. That is the honest answer to
*"is the test really doing what I said?"*: play the video from the intent's own
test and watch it type into the form.

The workflow publishes that report **two ways**, because both are useful:

**1. Download the artifact.** On the run's page, *Artifacts* → **playwright-report**.
Unzip it, open `index.html`. Works on private repos, needs no setup, kept 7 days.

**2. Open the URL.** The `publish-report` job pushes the same report to the
`gh-pages` branch, one folder per run, and posts the link as a comment on the
pull request (and in the run summary). Click it and the report opens in the
browser — videos play, traces open in the Trace Viewer — with nothing to
download. Reports are pruned after 30 days.

Both come from the same `playwright-report/` folder; the only difference is
whether you fetch it or it is served to you.

### Turning the Pages path on

Once, in the repo: **Settings → Pages → Build and deployment → Deploy from a
branch → `gh-pages` / `(root)`**. The branch is created by the first run that
publishes, so do a run first if the dropdown has nothing to pick.

Two things worth knowing before you enable this on a real repo:

- **A published report is public if the repo is public.** Failure screenshots,
  videos and traces of production data go with it. On a private repo the Pages
  site follows the repo's visibility, which is the reason the download path
  stays in the workflow.
- **Forked pull requests are skipped** — they get a read-only token, so there is
  nothing to push with. Contributors from forks still get the artifact.

The publishing steps come from
[grafana/plugin-actions](https://github.com/grafana/plugin-actions/blob/main/playwright-gh-pages/README.md):
`upload-report-artifacts` stages the report, `deploy-report-pages` pushes it and
comments the link. Its `grafana-image` / `grafana-version` inputs are required by
the action and only shape the published folder name — nothing here runs Grafana.
Both are referenced at `@main`, which is what their README documents; pin them to
a commit SHA if you would rather they never move under you.

Locally you get the same report with `make test-video && make report`.

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
