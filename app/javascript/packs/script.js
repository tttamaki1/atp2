
document.addEventListener("turbolinks:load", function () {

  // HTML から select タグを取得
  const languageSelect = document.querySelector('.language-select');

  // 選択されている言語の値を取得
  window.selectedLanguage = languageSelect.value;

  // ブラウザの言語を設定
  navigator.language = window.selectedLanguage;

  window.scrollTo(0, 0);

});
