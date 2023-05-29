
document.addEventListener("turbolinks:load", () => {$(function() {
    var $textInput = $('#destination-input');
    var $submitButton = $('.submit-button');
  
    $submitButton.hide(); // 初期状態ではボタンを非表示にする
  
    $textInput.on('input', function() {
      var inputValue = $textInput.val().trim();
      if (inputValue.length > 0) {
        $submitButton.fadeIn(); // ボタンをフェードインして表示する
  
        document.getElementsByClassName("submit-button")[0].addEventListener("click", function() {

          //mapが表示してあったら削除する
          function removeMap() {
            // map変数が存在する場合にのみマップを削除する
            if (map) {
              map.setMap(null);
              map = null;
            }
          }
          document.getElementById('your-element-id').addEventListener('click', function() {
            removeMap();
          });
          

          //loading.gifを表示する
          const loadingElements = document.getElementsByClassName("loading-container");
          const loadingElement = loadingElements[0]; // 最初の要素を選択
          loadingElement.classList.remove("hidden");

          var destination_input_text = document.getElementById("destination-input").value;
          // console.log(destination_input_text)
          if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
            setTimeout(function() { initializeMap(destination_input_text); }, 1000);
          } else {
            initializeMap(destination_input_text);
          }
        });
      } else {
        $submitButton.fadeOut(); // ボタンをフェードアウトして非表示にする
      }
    });
});
});