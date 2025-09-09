# MIGRATION

## 目的
旧 Vercel→clasp ベースの自動デプロイを廃止し、GAS へ直接編集・手動デプロイする運用へ移行する。

## Before / After
| Before | After |
| ------ | ----- |
| Vercel CI で `clasp push/deploy` | GAS エディタで直接編集し手動デプロイ |
| CLASPRC_JSON 等の機密 ENV が必要 | 機密はすべて Script Properties に保存 |
| PR マージで自動公開 | 開発者が GAS から手動で Web アプリを更新 |

## 影響範囲
- CI による自動反映は行われなくなる。
- Vercel を再開しても GAS へ push は行われない設計で安全。

## 移行手順
1. （任意）Vercel プロジェクトを Paused にするか、`CLASPRC_JSON` 等の環境変数を削除。
2. GAS で新規プロジェクトを作成し、`app/` と `ui/` のファイルを同名でコピー。
3. `appsscript.json` をマニフェストとして反映。
4. README の表を参考に Script Properties を設定。
5. Web アプリを 2 本デプロイ:
   - **office**: 実行＝アクセスするユーザー / アクセス権＝ドメイン内
   - **floor**: 実行＝自分 / アクセス権＝全員 (トークンで制御)
6. 必要なトリガ（期限チェック等）を設定。

## ロールバック
- Vercel を再有効化しても GAS へのデプロイは走らない。
- コードのロールバックは GAS のバージョン管理から実施。

## 完了の定義
- `/office` と `/floor` の URL が発行され動作確認済み。
- CLASPRC_JSON 等 clasp 系の環境変数が削除済み。
- Vercel がノーオペ状態であることを確認。
