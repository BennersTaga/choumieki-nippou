/**
 * Vercel の環境変数 CLASPRC_JSON の内容を ~/.clasprc.json として書き出す。
 * CLASPRC_JSON は “そのままの JSON 文字列” を保存しておくこと。
 */
const fs = require("fs");
const os = require("os");
const path = require("path");

const raw = process.env.CLASPRC_JSON;
if (!raw || !raw.trim()) {
  console.error("[write-clasprc] CLASPRC_JSON is empty. Set it in Vercel env.");
  process.exit(1);
}

const target = path.join(os.homedir(), ".clasprc.json");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, raw, { encoding: "utf8" });
console.log(`[write-clasprc] wrote: ${target}`);
