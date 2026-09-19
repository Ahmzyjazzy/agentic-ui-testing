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
- uses: actions/upload-artifact@v4       # the report, as a downloadable zip
- uses: peaceiris/actions-gh-pages@v4    # …and the same report, as a URL
```

That's it. The agent never blocks a merge.

## What the run leaves behind

Because `CI` is set, `playwright.config.ts` records a video and a trace for
every test, so the report is not just pass/fail — you can watch the browser do
the journey and scrub the trace action by action. That is the honest answer to
*"is the test really doing what I said?"*: play the video from the intent's own
test and watch it type into the form.

The workflow offers that report **two ways**, because both are useful:

**1. Download it.** On the run's page, *Artifacts* → **playwright-report**.
Unzip, open `index.html`. No setup, works on private repos and on pull requests
from forks, kept 7 days.

**2. Open it.** The same folder is pushed to the `gh-pages` branch under
`runs/<run number>/` and served by GitHub Pages, so there is a link to click —
videos play and traces open in the browser, nothing to download. The link goes
in the run summary, and on a pull request into a comment that is edited in
place rather than added to on every push.

Both come from the same `playwright-report/` folder. The only difference is
whether you fetch it or it is served to you.

### The publishing steps

Four steps, no magic:

```yaml
- name: Upload the report as an artifact
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/

- name: Publish the report to GitHub Pages
  if: ${{ always() && github.event.pull_request.head.repo.fork != true }}
  uses: peaceiris/actions-gh-pages@v4
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: playwright-report
    destination_dir: runs/${{ github.run_number }}
    keep_files: true
```

then a `run:` step that builds the URL and writes it to `$GITHUB_STEP_SUMMARY`
and, on a pull request, to a comment via `gh pr comment --edit-last`.

Worth understanding rather than copying blindly:

- **`if: always()`** — without it, a failed suite skips these steps and you lose
  the report for the run you most wanted to see.
- **`destination_dir: runs/<run number>`** — one folder per run, so run 41 does
  not overwrite run 40.
- **`keep_files: true`** — publish into that folder without wiping the rest of
  the branch. Leave it out and each run erases the previous ones.
- **`permissions:`** at the top of the workflow — `contents: write` to push to
  `gh-pages`, `pull-requests: write` for the comment. On a repo where that feels
  too broad for a test job, move the two publishing steps into a separate job
  that `needs:` this one and holds those permissions alone.

### Turning it on

Once, in the repo: **Settings → Pages → Build and deployment → Deploy from a
branch → `gh-pages` / `(root)`**. The branch is created by the first run that
publishes, so push first, let a run finish, then pick it — the dropdown is empty
until then. Until you do this, the link in the summary 404s while the artifact
keeps working.

Two things to know before putting this on a real repo:

- **A published report is public if the repo is public.** Failure screenshots,
  videos and traces of whatever data the test touched go with it. That is fine
  for a demo app with fake hosts, and a leak on a product repo.
- **Fork pull requests are skipped.** They get a read-only token, so there is
  nothing to push with — that is the `github.event.pull_request.head.repo.fork`
  check. Contributors from forks still get the artifact.

Old folders accumulate on `gh-pages`. For a demo that is fine; on a busy repo
add a step that deletes `runs/*` folders past whatever age you want.

**Only want the zip?** Delete the two publishing steps and the `permissions:`
block. The download path is self-contained and needs no repo settings at all.

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
