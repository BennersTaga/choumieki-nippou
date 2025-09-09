/**
 * Write ~/.clasprc.json for clasp.
 * - Accepts CLASPRC_JSON in either:
 *   A) {"token":{...},"oauth2ClientSettings":{...}} (clasp 互換)
 *   B) {"tokens":{"default":{ client_id, client_secret, refresh_token, access_token? ... }}}  (あなたの出力)
 * - If missing, skip gracefully.
 */
const fs = require('fs');
const path = require('path');

const raw = process.env.CLASPRC_JSON;
if (!raw || !raw.trim()) {
  console.log('[write-clasprc] CLASPRC_JSON is empty; skip');
  process.exit(0);
}

function coerceToClasp(jsonStr) {
  let obj;
  try { obj = JSON.parse(jsonStr); } catch (e) {
    throw new Error('[write-clasprc] CLASPRC_JSON is not valid JSON');
  }

  // すでに clasp 互換ならそのまま
  if (obj.token && obj.oauth2ClientSettings) return obj;

  // tokens.default 形式 → clasp 互換に変換
  const def = obj?.tokens?.default;
  if (def) {
    const scope =
      def.scope ||
      'https://www.googleapis.com/auth/script.deployments https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/script.webapp.deploy https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/service.management https://www.googleapis.com/auth/logging.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid';

    return {
      token: {
        access_token: def.access_token || '',
        refresh_token: def.refresh_token || '',
        scope,
        token_type: def.token_type || 'Bearer',
        expiry_date: def.expiry_date || undefined,
      },
      oauth2ClientSettings: {
        clientId: def.client_id || obj.oauth2ClientSettings?.clientId || '',
        clientSecret: def.client_secret || obj.oauth2ClientSettings?.clientSecret || '',
      },
      isLocalCreds: false,
    };
  }

  // どうしても不明ならそのまま保存（最小限）
  return obj;
}

const data = coerceToClasp(raw);
const home = process.env.HOME || '/vercel';
const dst = path.join(home, '.clasprc.json');
fs.writeFileSync(dst, JSON.stringify(data, null, 2));
console.log('[write-clasprc] wrote:', dst);
