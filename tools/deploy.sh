#!/usr/bin/env bash
set -euo pipefail

echo "[deploy.sh] start (VERCEL_ENV=${VERCEL_ENV:-unknown})"

# Preview/Dev は GAS デプロイをスキップしてダミー出力
if [[ "${VERCEL_ENV:-}" != "production" ]]; then
  echo "[deploy.sh] non-production build -> skip GAS deploy"
  mkdir -p public
  cat > public/index.html <<'HTML'
<!doctype html><meta charset="utf-8"><title>Preview OK</title>
<h1>Preview OK</h1><p>Dummy output for Vercel preview build.</p>
HTML
  exit 0
fi

# Production only: clasp deploy
echo "[deploy.sh] clasp version (via npx)"
npx clasp --version

echo "[deploy.sh] push"
npx clasp push -f

echo "[deploy.sh] version & deploy both webapps"
npx clasp version "Vercel CI $(date +'%F %T')"
npx clasp deploy -i "$DEPLOYMENT_ID_OFFICE"
npx clasp deploy -i "$DEPLOYMENT_ID_FLOOR"
