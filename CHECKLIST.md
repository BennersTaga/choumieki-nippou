# CHECKLIST

## A. 初回導入チェック
- [ ] Vercel を Paused にするか、機密 ENV を削除した。
- [ ] GAS プロジェクトを作成し、タイムゾーンを Asia/Tokyo に設定した。
- [ ] `app/` と `ui/` のファイルをコピーした。
- [ ] `appsscript.json` をマニフェストに反映した。
- [ ] Script Properties を設定した (例: `SPREADSHEET_ID`, `DRIVE_FOLDER_ID`, `COMPANY_DOMAIN`, `FACTORY_CODE`, `EXPIRY_DAYS`, `ANON_FORM_TOKEN`, `SLACK_WEBHOOK_URL`, `CHAT_WEBHOOK_URL`)。
- [ ] Web アプリを `/office` と `/floor` の 2 本デプロイした。
- [ ] 期限チェックなど必要なトリガを設定した。

## B. デプロイ前チェック
- [ ] GAS へ最新コードを貼り付けた。
- [ ] テスト用シートで動作確認した。
- [ ] バージョンを発行して Web アプリを更新した。

## C. 日常運用
- [ ] トリガ実行ログを確認した。
- [ ] シートや Drive の容量を確認した。
- [ ] 通知 (Slack/Chat) が届いているか確認した。

## D. 障害時
- [ ] GAS のバージョン管理から直前のバージョンへロールバック。
- [ ] `Execution log` でエラーを調査。
- [ ] 必要に応じて Vercel を停止または再開。
