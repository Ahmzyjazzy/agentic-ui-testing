#!/usr/bin/env bash
# Demo step: rename the class names a hand-written Playwright test depends on.
# Users see the same screen; selector-based tests fail.
set -euo pipefail
cd "$(dirname "$0")/.."
sed -i '' 's/btn-primary btn-login-v2/btn-primary auth-submit/' demo-app/src/pages/LoginPage.tsx
sed -i '' 's/>Sign in</>Log in</' demo-app/src/pages/LoginPage.tsx
sed -i '' 's/dash-title font-display/page-heading font-display/' demo-app/src/pages/DashboardPage.tsx
echo "UI renamed: .btn-login-v2 -> .auth-submit, .dash-title -> .page-heading, button label 'Sign in' -> 'Log in'"
echo "Run 'make restore-ui' to undo."
