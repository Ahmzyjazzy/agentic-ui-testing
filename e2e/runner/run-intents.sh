#!/usr/bin/env bash
# Run every intent file through the Antigravity CLI and set an exit code from
# the result files. This is the "agent in CI" path — nightly or on demand, not
# on every pull request (see docs/step-4-ci.md).
set -uo pipefail
shopt -s globstar nullglob

cd "$(dirname "$0")/../.."
mkdir -p reports output

export APP_URL="${APP_URL:-http://localhost:5173}"
export TEST_HOST_EMAIL="${TEST_HOST_EMAIL:-host@bookmi.test}"
export TEST_HOST_PASSWORD="${TEST_HOST_PASSWORD:-password}"

fail=0
for intent in e2e/intents/**/*.intent.md; do
  id="$(basename "$intent" .intent.md)"
  echo "── $id"
  rm -f "reports/$id.result.json"

  agy -p "$(cat e2e/runner/contract.md)

$(cat "$intent")" \
    --output-format json \
    --print-timeout 10m \
    --dangerously-skip-permissions > "reports/$id.raw.json" 2>"reports/$id.stderr.log"

  status="$(jq -r '.status // "error"' "reports/$id.result.json" 2>/dev/null || echo error)"
  echo "   $id: $status"
  [ "$status" = "pass" ] || fail=1
done

exit $fail
