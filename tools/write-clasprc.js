// Vercelの環境変数 CLASPRC_JSON を ~/.clasprc.json に書き出すユーティリティ
const fs = require('fs');
const os = require('os');
const path = require('path');

const data = process.env.CLASPRC_JSON;
if (!data) {
  console.error('CLASPRC_JSON is not set');
  process.exit(1);
}

const file = path.join(os.homedir(), '.clasprc.json');
fs.writeFileSync(file, data);
console.log('wrote', file);
