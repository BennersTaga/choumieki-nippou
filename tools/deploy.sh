#!/usr/bin/env bash
set -euo pipefail

# 1) .clasp.json を生成（Vercelの env から）
cat > ./.clasp.json <<EOF
{ "scriptId": "${SCRIPT_ID}", "rootDir": "." }
EOF

# 2) clasp で GAS へ反映 & デプロイ
npx @google/clasp push -f
npx @google/clasp version "Vercel CI"
npx @google/clasp deploy -i "$DEPLOYMENT_ID_OFFICE"
npx @google/clasp deploy -i "$DEPLOYMENT_ID_FLOOR"

echo "✅ GAS deploy done."
