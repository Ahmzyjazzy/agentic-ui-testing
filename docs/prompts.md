# Prompt sheet

Every prompt used in the codelab, ready to paste into `agy`. Keep this open on
a second screen while presenting.

<<<<<<< HEAD
## How to run them

**Interactive (what to use on stage).** Start the agent and paste the prompt:

```bash
agy
> <paste a prompt from below>
```

The agent asks permission before reading or writing files — approve each one.
That is a good thing to let the audience see.

**Headless one-shot.** `-p` cannot prompt, so it needs the permission flag or
every tool call is auto-denied (*"no output produced — a tool required the
read_file permission"*):

```bash
agy -p "<prompt>" --dangerously-skip-permissions
```

Fine for this throwaway demo repo and for CI. On a real codebase, prefer the
interactive run or scoped `permissions.allow` rules in
`~/.gemini/antigravity-cli/settings.json` — though there are open reports of
those rules being ignored in headless mode.

=======
>>>>>>> 79a0d7f (feat(step-3): intent files, prompt sheet, BrowserMCP config and answer keys)
## Lab 1 — BrowserMCP (your own Chrome)

```
Using BrowserMCP, connect to the application at http://localhost:5173. If the app is
already signed in, log out first. Then sign in as 'host@bookmi.test' with password
'password', and verify that the dashboard heading says 'Wallet overview'. Read the four
stat cards and present them back to me in a markdown table.
```

## Lab 2a — Playwright skill, headless

```
Using Playwright, connect to the application at http://localhost:5173. Sign in as
'host@bookmi.test' with password 'password', and verify that the dashboard heading says
'Wallet overview'. Take a screenshot of the dashboard and save it to output/dashboard.png.
Read the four stat cards and present them back to me in a markdown table.
```

## Lab 2b — Playwright skill, headed, dynamic data

```
Using Playwright, connect to the application at http://localhost:5173 in **headed** mode,
and keep the browser open when you're done. Sign in as 'host@bookmi.test' with password
'password', and verify that the dashboard heading says 'Wallet overview'. Take a screenshot
of the dashboard and save it to output/dashboard.png. Read the four stat card values and
record them. Then wait 3 seconds and read them again. Present both reads in a markdown
table with the difference for each card.
```

## Lab 2c — The signup journey, as intent

```
Using Playwright, open http://localhost:5173 and sign up as a brand-new host: click
Get started, use the name 'Ada Lovelace' and a unique email, and a password of at least
8 characters. On the claim-your-page step, confirm the Bookmi link was suggested from the
name, then claim it. Verify you land on a dashboard whose heading says 'Wallet overview',
and take a screenshot to output/signup-dashboard.png.
```

## Lab 3 — Generate a Playwright spec from an intent file

On the `step-3-intent` branch this file does not exist yet — this prompt is what
creates it. The reference output is in `docs/examples/`.

```
Read e2e/intents/auth/login.intent.md and create tests/auth/login.generated.spec.ts using
getByRole/getByLabel locators — no CSS classes or ids. Run it with pnpm exec playwright test until
it passes. Do not change any application code. Add a "// source-intent:" header naming the
intent file. Then do the same for e2e/intents/auth/signup.intent.md.
```

## Lab 3b — Regenerate after a UI change

```
The UI changed and tests/auth/login.spec.ts is failing. Read e2e/intents/auth/login.intent.md,
run the failing test to see the error, and update the spec so it matches the intent again.
Prefer role and label locators. Do not change application code.
```

## The moment that sells it

Run `make break-ui` first, then run the Lab 1 or Lab 2 prompt. The
hand-written suite is red; the intent still passes.
