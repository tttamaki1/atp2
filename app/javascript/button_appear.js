$(function() {
    var $textInput = $('#destination-input');
    var $submitButton = $('.submit-button');
  
    $submitButton.hide(); // 初期状態ではボタンを非表示にする
  
    $textInput.on('input', function() {
      var inputValue = $textInput.val().trim();
      if (inputValue.length > 0) {
        $submitButton.fadeIn(); // ボタンをフェードインして表示する
      } else {
        $submitButton.fadeOut(); // ボタンをフェードアウトして非表示にする
      }
    });
  });