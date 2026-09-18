#!/usr/bin/env bash
# Safety net for the stage: if the live generation fails (no network, agent in a
# mood), drop the reference specs from docs/examples into tests/ so the
# brittle-vs-intent comparison still works.
set -euo pipefail
cd "$(dirname "$0")/.."

for name in login signup; do
  src="docs/examples/${name}.generated.spec.ts.example"
  dest="tests/auth/${name}.generated.spec.ts"
  [ -f "$src" ] || continue
  # strip the answer-key header (everything up to the first import)
  sed -n '/^import /,$p' "$src" > "$dest"
  echo "restored $dest"
done
echo "These are the reference specs — normally you generate them with the Lab 3 prompt."
