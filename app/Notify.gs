/* Slack/Chat送信, 期限3日前通知 */

function notifySlack(message) {
  const url = getScriptProperty('SLACK_WEBHOOK_URL');
  if (!url) return;
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ text: message })
  });
}

function notifyChat(message) {
  const url = getScriptProperty('CHAT_WEBHOOK_URL');
  if (!url) return;
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ text: message })
  });
}

function notifyExpiry() {
  // TODO: シートから期限を取得し3日前に通知
}

