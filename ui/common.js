/* google.script.run ラッパ, フォーム検証, トースト, JsBarcodeローダ */
<script>
function gas(func, ...args) {
  return new Promise((resolve, reject) => {
    google.script.run.withSuccessHandler(resolve).withFailureHandler(reject)[func](...args);
  });
}

function showToast(msg) {
  alert(msg); // TODO: スタイルされたトーストに置き換え
}

// JsBarcodeローダ（必要時にロード）
function loadJsBarcode() {
  if (window.JsBarcode) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
</script>
