/* マスター同期, スキーマ検証, 液↔製品 1対1制約チェック, onOpenメニュー */

function syncMasters() {
  // TODO: スプレッドシートからマスター情報を取得しキャッシュ
}

function validateSchemas() {
  // TODO: スキーマ検証ロジック
}

function checkOneToOneMappings() {
  // TODO: 液と製品の1対1制約チェック
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('調味液日報')
    .addItem('今すぐ同期', 'syncMasters')
    .addItem('トリガ再設定', 'setupTriggers')
    .addToUi();
}

