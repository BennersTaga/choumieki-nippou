const fs = require('fs');
const path = require('path');

const json = process.env.CLASPRC_JSON;
if (!json) {
  console.log('[write-clasprc] CLASPRC_JSON not set; skipping');
  process.exit(0);
}
const home = process.env.HOME || '/vercel';
const dest = path.join(home, '.clasprc.json');
fs.writeFileSync(dest, json);
console.log('[write-clasprc] wrote:', dest);
