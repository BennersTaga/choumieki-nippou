#!/bin/bash
# mainブランチ時のみ: clasp push && clasp version && clasp deploy -i $DEPLOYMENT_ID_OFFICE && clasp deploy -i $DEPLOYMENT_ID_FLOOR
set -e

if [ "$VERCEL_ENV" = "production" ]; then
  npx clasp push
  npx clasp version "CI deploy"
  npx clasp deploy -i "$DEPLOYMENT_ID_OFFICE"
  npx clasp deploy -i "$DEPLOYMENT_ID_FLOOR"
else
  echo "skip deploy"
fi
