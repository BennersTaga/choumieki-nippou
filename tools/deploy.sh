#!/usr/bin/env bash
# NOTE: このファイルは実行権限(100755)を維持してください
set -euo pipefail

echo "[deploy.sh] start"

# ~/.clasprc.json は write-clasprc.js が Vercel 実行前に作成する
echo "[deploy.sh] clasp version (via npx)"
npx -y @google/clasp --version

echo "[deploy.sh] push"
npx -y @google/clasp push -f

echo "[deploy.sh] create version"
npx -y @google/clasp version "Vercel CI $(date +%Y%m%d%H%M%S)"

echo "[deploy.sh] deploy office"
npx -y @google/clasp deploy -i "$DEPLOYMENT_ID_OFFICE"

echo "[deploy.sh] deploy floor"
npx -y @google/clasp deploy -i "$DEPLOYMENT_ID_FLOOR"

echo "[deploy.sh] done"
