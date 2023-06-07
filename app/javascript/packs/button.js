
document.addEventListener("turbolinks:load", () => {$(function() {
    let destinationInputValue
    let $textInput = $('#destination-input');
    let $submitButton = $('.submit-button');
  
    $submitButton.hide(); // 初期状態ではボタンを非表示にする
  
    $textInput.on('input', function() {
      let destinationInputValue = $textInput.val().trim();
      if (destinationInputValue.length > 0) {
        $submitButton.fadeIn(); // ボタンをフェードインして表示する

      } else {
        $submitButton.fadeOut(); // ボタンをフェードアウトして非表示にする
      }
    });

    $submitButton.on("click", function() {
      destinationInputValue = $textInput.val().trim();
      console.log(destinationInputValue)
      window.destinationInputValue = destinationInputValue;
      if (destinationInputValue.length > 0) {
              //マーカーを全て削除する
        console.log(window.markers)
        if (window.markers.length > 0) {
          window.markers.forEach((marker) => {
            marker.setMap(null); // マーカーをマップから削除
          });
          window.markers = []; // マーカー配列をクリア
          console.log(window.markers)
        }
        //loading.gifを表示する
        const loadingElements = document.getElementsByClassName("loading-container");
        const loadingElement = loadingElements[0]; // 最初の要素を選択
        loadingElement.classList.remove("hidden");
        console.log(loadingElement)
        console.log("loadingElement")


        let destination_input_text = document.getElementById("destination-input").value;
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