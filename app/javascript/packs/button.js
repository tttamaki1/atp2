
document.addEventListener("turbolinks:load", () => {$(function() {
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

    $submitButton.on("click", function() {
      var inputValue = $textInput.val().trim();
  
      if (inputValue.length > 0) {
          // マップのマーカー配列を削除する
          // console.log("aaaa")
          // if (markers.length > 0) {
          //   for (let i = 0; i < markers.length; i++) {
          //     markers[i].setMap(null);
          //     console.log("bbbbb")
          //   }
          // }

        //loading.gifを表示する
        const loadingElements = document.getElementsByClassName("loading-container");
        const loadingElement = loadingElements[0]; // 最初の要素を選択
        loadingElement.classList.remove("hidden");
        console.log(loadingElement)
        console.log("loadingElement")


        var destination_input_text = document.getElementById("destination-input").value;
        // console.log(destination_input_text)
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
          setTimeout(function() { initializeMap(destination_input_text); }, 1000);
        } else {
          initializeMap(destination_input_text);
        }
      }
    });

});
});