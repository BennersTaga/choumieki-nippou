const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "public");
const outFile = path.join(outDir, "index.html");

const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>調味液日報 Webアプリ / 運用方針のご案内</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Noto Sans JP, sans-serif; margin: 0; padding: 32px; line-height: 1.7; }
    .card { max-width: 860px; margin: 0 auto; padding: 28px; border: 1px solid #eee; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,.04); }
    h1 { margin-top: 0; font-size: 22px; }
    code, kbd { background: #f6f8fa; padding: .15em .4em; border-radius: 6px; }
    .note { background: #fff8e1; border-left: 4px solid #f4c430; padding: 12px 14px; border-radius: 8px; }
    ul { padding-left: 1.2em; }
  </style>
</head>
<body>
  <main class="card">
    <h1>調味液日報 Webアプリ（無料ツールMVP）</h1>
    <p class="note"><strong>お知らせ：</strong>このプロジェクトは <strong>Google Apps Script（GAS）エディタに直接コードを書き込む</strong>運用に切り替えました。Vercel は <em>ダミーの静的ページ</em>のみを配信し、GAS への自動デプロイは行いません。</p>
    <h2>運用方針（要点）</h2>
    <ul>
      <li>実装は GAS（HTMLService）に直接貼り付け・保存。</li>
      <li>Webアプリは <code>/office</code> と <code>/floor</code> の <strong>2本デプロイ</strong>を GAS 側で作成。</li>
      <li>権限の目安：
        <ul>
          <li><code>/office</code>：実行＝アクセスするユーザー／アクセス権＝ドメイン内</li>
          <li><code>/floor</code>：実行＝自分（デプロイヤ）／アクセス権＝全員（匿名トークンで制御）</li>
        </ul>
      </li>
      <li>スクリプトプロパティに台帳シートID・DriveフォルダID・ドメイン名・工場コード・期限日数・通知Webhook などを設定。</li>
    </ul>
    <p>詳細手順はリポジトリ内の <code>README.md</code> / <code>MIGRATION.md</code> / <code>CHECKLIST.md</code> を参照してください。</p>
  </main>
</body>
</html>`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, html, "utf8");
console.log(`[make-public] Wrote ${path.relative(process.cwd(), outFile)}`);
