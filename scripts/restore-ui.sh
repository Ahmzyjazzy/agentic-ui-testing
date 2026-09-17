#!/usr/bin/env bash
# Undo break-ui.sh
set -euo pipefail
cd "$(dirname "$0")/.."
sed -i '' 's/btn-primary auth-submit/btn-primary btn-login-v2/' demo-app/src/pages/LoginPage.tsx
sed -i '' 's/>Log in</>Sign in</' demo-app/src/pages/LoginPage.tsx
sed -i '' 's/page-heading font-display/dash-title font-display/' demo-app/src/pages/DashboardPage.tsx
echo "UI restored."
