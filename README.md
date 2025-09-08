# choumieki-nippou

調味液日報のリポジトリ。Google Apps Script + Google スプレッドシートを用いたMVPです。

## Script Properties 初期値

| Key | 説明 |
| --- | --- |
| SPREADSHEET_ID | データを格納するスプレッドシートID |
| DRIVE_PHOTO_FOLDER_ID | 廃棄写真を保存するDriveフォルダID |
| SLACK_WEBHOOK_URL | 5F向け通知のWebhook |
| CHAT_WEBHOOK_URL | 現場向け通知のWebhook |
| COMPANY_DOMAIN | 社内ドメイン (例: example.com) |
| FACTORY_CODE_HN | "+F" |
| FACTORY_CODE_GT | "GT" |
| SHELF_LIFE_DEFAULT_DAYS | "21" |
| PACK_DECIMALS | "1" |
| GRAMS_DECIMALS | "1" |
| ROUNDING_MODE | "HALF_UP" |
| ANON_FORM_TOKEN | /floor 用のトークン |

## 開発

`npm run lint` と `npm test` はプレースホルダです。Vercel 上では `npm run ci:vercel` が実行され、必要に応じて Apps Script へデプロイします。

