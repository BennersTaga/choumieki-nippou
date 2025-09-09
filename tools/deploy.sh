#!/usr/bin/env bash
set -euo pipefail

echo "[deploy.sh] start (VERCEL_ENV=${VERCEL_ENV:-unknown})"

# Preview/Dev では GAS デプロイをスキップし、Vercel が要求するダミー出力を生成
if [[ "${VERCEL_ENV:-}" != "production" ]]; then
  echo "[deploy.sh] non-production build -> skip GAS deploy"
  mkdir -p public
  cat > public/index.html <<'HTML'
<!doctype html><meta charset="utf-8"><title>Preview OK</title>
<h1>Preview OK</h1><p>Dummy output for Vercel preview build.</p>
HTML
  exit 0
fi

# === Production only ===
# .clasp.json を Vercel 環境変数から生成（GASの Script ID を付与）
if [[ -z "${SCRIPT_ID:-}" ]]; then
  echo "[deploy.sh] ERROR: SCRIPT_ID is not set"; exit 1
fi
cat > ./.clasp.json <<EOF
{ "scriptId": "${SCRIPT_ID}", "rootDir": "." }
EOF

echo "[deploy.sh] clasp version (via npx)"
npx clasp --version

echo "[deploy.sh] push"
npx clasp push -f

echo "[deploy.sh] version & deploy both webapps"
npx clasp version "Vercel CI $(date +'%F %T')"
npx clasp deploy -i "${DEPLOYMENT_ID_OFFICE:?DEPLOYMENT_ID_OFFICE not set}"
npx clasp deploy -i "${DEPLOYMENT_ID_FLOOR:?DEPLOYMENT_ID_FLOOR not set}"

echo "✅ GAS deploy done."

