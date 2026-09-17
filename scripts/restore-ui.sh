#!/usr/bin/env bash
# Undo break-ui.sh
set -euo pipefail
cd "$(dirname "$0")/.."
perl -pi -e 's/btn-primary auth-submit/btn-primary btn-login-v2/' demo-app/src/pages/LoginPage.tsx
perl -pi -e 's/: "Log in"}/: "Sign in"}/' demo-app/src/pages/LoginPage.tsx
perl -pi -e 's/nav-login inline-flex/nav-signin inline-flex/' demo-app/src/pages/LandingPage.tsx
perl -pi -e 's/page-heading font-display/dash-title font-display/' demo-app/src/pages/DashboardPage.tsx
echo "UI restored."
