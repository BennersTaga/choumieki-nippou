# choumieki-nippou

調味液日報の設計・資産・ドキュメント置き場です。GAS エディタに直接コードを書き込み、Web アプリとして手動デプロイする運用に移行しました。

## TL;DR
- コードは **Google Apps Script (GAS)** エディタに直接貼り付ける。
- Web アプリを `/office` と `/floor` の **2 本**デプロイする。
- 本リポジトリはドキュメントとスニペットの保管庫。CI で GAS へ push はしない。

## 背景と目的
従来は Vercel CI から `clasp` で GAS へ自動デプロイしていたが、OAuth 設定が運用上の障壁となったため、CI を廃止し手動運用に切り替える。

## システム構成 (MVP)
- Google スプレッドシート: データ台帳
- Google Apps Script: フロントエンド + バックエンド (HTMLService)
- Web アプリ `/office` & `/floor`: 利用者向け UI
- Vercel (任意): ダミーの静的ページを配信するだけ

## ファイル構成と貼付順序
```
app/       // GAS の *.gs ファイル
ui/        // HTMLService 用の *.html, *.js, *.css
appsscript.json // マニフェスト (必要に応じて反映)
```
1. GAS プロジェクトを作成し、`app/` のファイルを同名でコピー。
2. `ui/` のファイルを HTML ファイルとして順次追加。
3. `appsscript.json` の内容をマニフェストに反映。

## セットアップ手順
1. GAS で新規プロジェクトを作成し、タイムゾーンを Asia/Tokyo に設定。
2. 上記ファイルを貼り付けて保存。
3. **スクリプトプロパティ** を設定:

| Key | 説明 |
| --- | --- |
| `SPREADSHEET_ID` | 台帳スプレッドシート ID |
| `DRIVE_FOLDER_ID` | 画像保存先 Drive フォルダ ID |
| `COMPANY_DOMAIN` | 社内ドメイン (例: `example.com`) |
| `FACTORY_CODE` | 工場コード (例: `GT`) |
| `EXPIRY_DAYS` | 賞味期限日数 (例: `21`) |
| `ANON_FORM_TOKEN` | `/floor` 用匿名投稿トークン |
| `SLACK_WEBHOOK_URL` | Slack 通知用 Webhook |
| `CHAT_WEBHOOK_URL` | Google Chat 通知用 Webhook |

## Web アプリの 2 本デプロイ
| 名前 | 実行者 | アクセス権 | 用途 |
| ---- | ------ | ---------- | ---- |
| `/office` | アクセスするユーザー | 社内ドメイン限定 | 事務所向け UI |
| `/floor` | 自分 (デプロイヤ) | 全員 (トークンで制御) | 現場向け UI |

## トリガ設定の雛形
- 期限接近チェック: 時間主導型トリガを毎日 1 回。
- フォーム投稿後処理やシート編集にフックする場合は `doPost` や `onEdit` を実装し、必要なトリガを追加。

## 運用・ロールバック
- GAS の [バージョン管理] から直前のバージョンへ復元可能。
- `Execution log` や Stackdriver でログを確認。

## Vercel の扱い
- `npm run ci:vercel` は `public/index.html` を生成するだけのダミーです。
- Vercel を停止するか、Paused 状態で `public` を配信させるだけの運用にします。
- `clasp` を利用した自動デプロイは行いません。

## セキュリティ
- 機密情報は **スクリプトプロパティ** にのみ保存し、リポジトリへコミットしない。
- Web アプリの権限は最小限に設定する。

## FAQ
- **Q. 自動デプロイできますか?** → いいえ。手動で GAS へ貼り付け・デプロイします。
- **Q. `node` や `npm` は必要ですか?** → いいえ。Vercel を使う場合のみ `ci:vercel` がダミーで実行されます。

詳細手順は [MIGRATION.md](MIGRATION.md) と [CHECKLIST.md](CHECKLIST.md) を参照してください。
