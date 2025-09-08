/* setupTriggers(): 毎時同期/03:00バックアップ/09:00通知/00:05トークン回転 */

function setupTriggers() {
  // TODO: 時間トリガの設定
}

function hourlySync() {
  syncMasters();
}

function dailyBackup() {
  // TODO: スプレッドシートのバックアップ
}

function notifyDaily() {
  notifyExpiry();
}

function rotateToken() {
  // TODO: ANON_FORM_TOKEN を日次で更新
}

