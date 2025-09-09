const fs = require('fs');
const path = require('path');

const raw = process.env.CLASPRC_JSON;
const home = process.env.HOME || '/vercel';
const dest = path.join(home, '.clasprc.json');

function fail(msg) {
  console.error('[write-clasprc] ERROR:', msg);
  process.exit(1);
}

if (!raw) {
  console.log('[write-clasprc] CLASPRC_JSON not set; skipping write');
  process.exit(0);
}

let src;
try {
  src = JSON.parse(raw);
} catch (e) {
  fail('CLASPRC_JSON is not valid JSON');
}

// normalize: support both {token:{...}} and {tokens:{default:{...}}}
let token = src.token;
if (!token && src.tokens && src.tokens.default) token = src.tokens.default;
if (!token) fail('missing token information (expected token or tokens.default)');

const clientId =
  token.client_id || (src.oauth2ClientSettings && src.oauth2ClientSettings.clientId);
const clientSecret =
  token.client_secret || (src.oauth2ClientSettings && src.oauth2ClientSettings.clientSecret);
if (!clientId || !clientSecret) {
  fail('missing client_id/client_secret for oauth2ClientSettings');
}

const normalized = {
  token: {
    access_token: token.access_token,
    refresh_token: token.refresh_token,
    scope:
      token.scope ||
      'https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/script.webapp.deploy https://www.googleapis.com/auth/drive.file',
    token_type: token.token_type || 'Bearer',
    expiry_date: token.expiry_date || Date.now() + 30 * 60 * 1000
  },
  oauth2ClientSettings: {
    clientId,
    clientSecret,
    redirectUri: 'http://localhost'
  },
  isLocalCreds: false
};

fs.writeFileSync(dest, JSON.stringify(normalized));
console.log('[write-clasprc] wrote:', dest);

