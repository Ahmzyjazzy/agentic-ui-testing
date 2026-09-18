# Troubleshooting

**Port 5173 is already in use** — the upstream codelab's demo app may still be
running. Stop it, or run this one on another port:
`pnpm --filter bookmi-demo-app dev -- --port 5174` (and pass
`baseURL=http://localhost:5174` to Playwright via `PLAYWRIGHT_BASE_URL` or edit
`playwright.config.ts`).

**`pnpm exec playwright test` can't find a browser** — run
`pnpm exec playwright install chromium` (add `--with-deps` on Linux).

**`agy: command not found`** — the installer puts the binary in
`~/.local/bin`. Add it to your PATH, then run `agy` once to sign in.

**`/mcp` doesn't list `browsermcp`** — check the JSON at
`~/.gemini/config/mcp_config.json` (valid JSON, correct path), and that `npx` is
on your PATH. Then restart `agy`.

**The agent reaches for the wrong browser tool** — disable BrowserMCP inside
`agy`: `/mcp` → `browsermcp` → Disable.

**BrowserMCP does nothing** — the extension must say *Connected* on the tab you
want driven, and the app must already be open in that tab.

**The agent can't save a screenshot** — you're on BrowserMCP, which has no file
system access. Use the Playwright skill (step 3, Lab 2).

**`make break-ui` did nothing** — the scripts use `perl -pi -e`, so they work on
macOS and Linux. Make sure you're in the repo root and the files are writable.

**The tests are still red after `make restore-ui`** — check `git diff`; if the
demo app files drifted, `git checkout -- demo-app` restores them.

**Windows** — run everything inside WSL. BrowserMCP needs a local browser, so it
won't work from Cloud Shell; Antigravity's built-in browser agent needs WSL
mirrored networking.

**`pnpm: command not found`** — Node ships Corepack:
`corepack enable && corepack prepare pnpm@10.15.0 --activate`.

**`ERR_PNPM_OUTDATED_LOCKFILE` in CI** — `package.json` changed without
`pnpm-lock.yaml`. Run `pnpm install` locally and commit the lockfile.

**Vite fails to start after install** — pnpm 10 blocks postinstall scripts, so
esbuild is allow-listed in `pnpm-workspace.yaml` under `onlyBuiltDependencies`.
If you add a dependency that needs its own build step, add it there too, then
`pnpm rebuild`.

**`make test-headed` opens nothing** — check you're not overriding `HEADED` in
your shell, and that a browser is installed: `pnpm exec playwright install chromium`.
`make test-chrome` additionally needs Google Chrome itself installed.
