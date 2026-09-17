#!/usr/bin/env bash
# Demo step: rename the class names and button label that the hand-written
# Playwright tests depend on. Users see the same screens; the tests go red.
set -euo pipefail
cd "$(dirname "$0")/.."
perl -pi -e 's/btn-primary btn-login-v2/btn-primary auth-submit/' demo-app/src/pages/LoginPage.tsx
perl -pi -e 's/: "Sign in"}/: "Log in"}/' demo-app/src/pages/LoginPage.tsx
perl -pi -e 's/nav-signin inline-flex/nav-login inline-flex/' demo-app/src/pages/LandingPage.tsx
perl -pi -e 's/dash-title font-display/page-heading font-display/' demo-app/src/pages/DashboardPage.tsx
echo "UI renamed:"
echo "  .btn-login-v2 -> .auth-submit"
echo "  .nav-signin   -> .nav-login"
echo "  .dash-title   -> .page-heading"
echo "  button label 'Sign in' -> 'Log in'"
echo "Run 'make restore-ui' to undo."
