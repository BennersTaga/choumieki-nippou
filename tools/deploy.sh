#!/usr/bin/env bash
set -euo pipefail

echo "[deploy.sh] start (VERCEL_ENV=${VERCEL_ENV:-})"

# Preview / Development では GAS へのデプロイをスキップ
if [ "${VERCEL_ENV:-}" != "production" ]; then
  echo "[deploy.sh] non-production build -> skip GAS deploy"
  exit 0
fi

echo "[deploy.sh] clasp version (via npx)"
npx clasp -v

echo "[deploy.sh] push"
npx clasp push -f
npx clasp version "Vercel CI"
npx clasp deploy -i "$DEPLOYMENT_ID_OFFICE"
npx clasp deploy -i "$DEPLOYMENT_ID_FLOOR"

echo "[deploy.sh] done"
