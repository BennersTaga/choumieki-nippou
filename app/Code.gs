/* doGet(e), ルーティング(view=office/floor), 権限判定, ロット採番, 汎用Util */

/**
 * エントリーポイント。
 * view=office|floor でUIを切り替える。
 */
function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const view = params.view;
  if (view === 'office') {
    enforceOfficeAccess();
    return HtmlService.createTemplateFromFile('ui/Office').evaluate();
  }
  if (view === 'floor') {
    enforceFloorToken(params.token);
    return HtmlService.createTemplateFromFile('ui/Floor').evaluate();
  }
  return HtmlService.createHtmlOutput('');
}

/** 5F向けアクセス制御 */
function enforceOfficeAccess() {
  const email = Session.getActiveUser().getEmail();
  const domain = getScriptProperty('COMPANY_DOMAIN');
  if (!email || !email.endsWith('@' + domain)) {
    throw new Error('権限がありません');
  }
}

/** 現場向けトークンチェック */
function enforceFloorToken(token) {
  const expected = getScriptProperty('ANON_FORM_TOKEN');
  if (!token || token !== expected) {
    throw new Error('トークンが無効です');
  }
}

/** ロット採番: {factory}-{YYYYMMDD}-{seq} */
function generateLotId(factoryCode) {
  const date = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMdd');
  // TODO: 実際は連番をスプレッドシート等で管理
  const seq = '001';
  return [factoryCode, date, seq].join('-');
}

/** ScriptProperties ヘルパ */
function getScriptProperty(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

