#!/usr/bin/env bash
# Regenerate Playwright specs from the intent files — the whole suite, locally.
#
# This is the batch version of the Lab 3 prompt in docs/prompts.md: one agy call
# per intent file, same instructions, so after a UI change you refresh every
# spec with one command instead of pasting prompts one at a time.
#
# Not to be confused with e2e/runner/run-intents.sh, which is the other
# direction: it hands the intents to the agent to *execute* against a running
# app (the nightly smoke job). This script produces code you commit.
#
#   ./scripts/generate-specs.sh                                  every intent
#   ./scripts/generate-specs.sh e2e/intents/auth/login.intent.md one intent
#   DRY_RUN=1 ./scripts/generate-specs.sh                        print prompts, call nothing
#   VERIFY=0 ./scripts/generate-specs.sh                         skip the final test run
#
# Needs `agy` on PATH and the demo app running (`make dev`), so the agent can
# run what it wrote. No agent handy? `make restore-generated` drops the
# reference specs from docs/examples/ in instead.
set -uo pipefail
shopt -s globstar nullglob

cd "$(dirname "$0")/.."

APP_URL="${APP_URL:-http://localhost:5173}"
DRY_RUN="${DRY_RUN:-0}"
VERIFY="${VERIFY:-1}"

intents=("$@")
if [ ${#intents[@]} -eq 0 ]; then
  intents=(e2e/intents/**/*.intent.md)
fi

if [ ${#intents[@]} -eq 0 ]; then
  echo "No intent files found under e2e/intents/." >&2
  exit 1
fi

if [ "$DRY_RUN" != "1" ]; then
  command -v agy >/dev/null 2>&1 || {
    echo "agy is not on PATH — install the Antigravity CLI, or run 'make restore-generated'." >&2
    exit 1
  }
  curl -sfI "$APP_URL" >/dev/null 2>&1 || {
    echo "Warning: nothing answering at $APP_URL. Start the app with 'make dev' in another"
    echo "terminal, or the agent cannot run the spec it writes."
  }
fi

generated=()
failed=()

for intent in "${intents[@]}"; do
  [ -f "$intent" ] || { echo "skip: $intent not found"; failed+=("$intent"); continue; }

  # e2e/intents/auth/login.intent.md  ->  tests/auth/login.generated.spec.ts
  rel="${intent#e2e/intents/}"
  dest="tests/${rel%.intent.md}.generated.spec.ts"
  mkdir -p "$(dirname "$dest")"

  read -r -d '' prompt <<PROMPT
Read $intent and create $dest using getByRole/getByLabel locators — no CSS classes or ids.
The app is already running at $APP_URL. Run it with 'pnpm exec playwright test $dest' until it
passes. Do not change any application code. Add a '// source-intent: $intent' header at the top.
PROMPT

  echo "── $intent → $dest"

  if [ "$DRY_RUN" = "1" ]; then
    printf '%s\n\n' "$prompt"
    continue
  fi

  agy -p "$prompt" --print-timeout 10m --dangerously-skip-permissions

  if [ -s "$dest" ]; then
    generated+=("$dest")
    echo "   wrote $dest"
  else
    failed+=("$intent")
    echo "   no spec produced for $intent"
  fi
done

[ "$DRY_RUN" = "1" ] && exit 0

echo
echo "generated: ${#generated[@]}   failed: ${#failed[@]}"

if [ "$VERIFY" = "1" ] && [ ${#generated[@]} -gt 0 ]; then
  echo "Verifying the generated specs…"
  pnpm exec playwright test "${generated[@]}" || exit 1
fi

[ ${#failed[@]} -eq 0 ]
