# Step 3 — Intent instead of selectors

You are on the **`step-3-intent`** branch. Everything from step 2 is here, plus:

```
e2e/intents/…            intent files — what to test, in plain English (you write these)
e2e/runner/              the output contract + a runner that sets an exit code
docs/examples/…          answer key: what agy generated when this codelab was built
mcp_config.example.json  BrowserMCP config for the live demo (not used by the app or CI)
```

`tests/` still holds only the hand-written specs from step 2 — **the generated
ones are the lab**. Run the Lab 3 prompt and the agent writes them for you.

![Landing, sign up, claim your page, dashboard](docs/screenshots/flow.png)

<sub>The app you'll be testing: landing → sign up → claim your page → dashboard.</sub>

## The demo steps:

Run these in order — this is the whole story of the talk in six commands.

**1. Break the UI.** A designer renames three classes and a button label.
Nothing changes for a human using the app.

```bash
make break-ui
```

**2. Watch the hand-written spec die.** It was pinned to those class names.

```bash
pnpm exec playwright test tests/auth/login.spec.ts        # ✘ TimeoutError: button.btn-login-v2
```

**3. Show the intent file.** Plain English, no selectors — this is what you
actually meant to test, and it is still true.

```bash
cat e2e/intents/auth/login.intent.md
```

**4. Generate the spec from it.** The agent reads the intent, writes the
TypeScript, and runs it until it passes. `tests/auth/login.generated.spec.ts`
does not exist until this command creates it.

Run it **interactively** — this is the better demo, because the room watches the
agent ask permission before it reads and writes your files:

```bash
agy
```

then paste the Lab 3 prompt from [docs/prompts.md](docs/prompts.md) and approve
each tool call.

One-shot version, for when you don't want to approve anything by hand:

```bash
agy -p "Read e2e/intents/auth/login.intent.md and create tests/auth/login.generated.spec.ts using getByRole/getByLabel locators — no CSS classes or ids. Run it with pnpm exec playwright test until it passes. Do not change any application code. Add a '// source-intent:' header naming the intent file." --dangerously-skip-permissions
```

> **`-p` needs the permission flag.** Headless mode can't prompt, so without
> `--dangerously-skip-permissions` every tool call is auto-denied and you get
> *"no output produced — a tool required the read_file permission"*. This repo
> is a throwaway demo, so skipping is fine here; on a real codebase prefer the
> interactive run. (Scoped `permissions.allow` rules in
> `~/.gemini/antigravity-cli/settings.json` are the documented alternative, but
> there are open reports of them being ignored in headless mode.)

Offline or the agent stalls? `make restore-generated` drops the reference spec
in so the demo continues.

**5. Run the generated spec against the same broken UI.** Green — it looks for
the button that signs you in, not for `.btn-login-v2`.

```bash
pnpm exec playwright test tests/auth/login.generated.spec.ts   # ✓

# or watch that one file run in a real browser
make test-headed SLOWMO=600 SPEC=tests/auth/login.generated.spec.ts
```

**6. Put the UI back.**

```bash
make restore-ui
```

The agent prompts from [docs/prompts.md](docs/prompts.md) (Labs 1 and 2) also
pass against the broken UI — run those first if you want the wow before the
workflow.

Walkthrough: **[docs/step-3-intent.md](docs/step-3-intent.md)** ·
Prompts: **[docs/prompts.md](docs/prompts.md)** ·
BrowserMCP: **[docs/browsermcp.md](docs/browsermcp.md)**

## Branches in this codelab

| Branch              | What it adds                                                                    |
| ------------------- | ------------------------------------------------------------------------------- |
| `step-1-manual`     | The app only — test it by hand                                                  |
| `step-2-playwright` | Hand-written Playwright tests with CSS selectors, and a script that breaks them |
| `step-3-intent`     | Intent files, agent prompts, BrowserMCP demo config, generated spec             |
| `main`              | The final setup: intent files, generated specs, CI workflow, full guide         |
