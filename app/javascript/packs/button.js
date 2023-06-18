
document.addEventListener("turbolinks:load", () => {$(function() {
    let destinationInputValue
    const $textInput = $('#destination-input');
    const $submitButton = $('.submit-button');
    const $destinationHotelInput = $('#destination-hotel-input');
    const $hotelInputButton = $('.hotel-input-btn');
  
    $submitButton.hide(); // 初期状態ではボタンを非表示にする
  
    $textInput.on('input', function() {
      let destinationInputValue = $textInput.val().trim();
      if (destinationInputValue.length > 0) {
        $submitButton.fadeIn(); // ボタンをフェードインして表示する

      } else {
        $submitButton.fadeOut(); // ボタンをフェードアウトして非表示にする
      }
    });

    $hotelInputButton.hide(); // 初期状態ではボタンを非表示にする
  
    $destinationHotelInput.on('input', function() {
      let destinationInputValue = $destinationHotelInput.val().trim();
      if (destinationInputValue.length > 0) {
        $hotelInputButton.fadeIn(); // ボタンをフェードインして表示する

      } else {
        $hotelInputButton.fadeOut(); // ボタンをフェードアウトして非表示にする
      }
    });

    $submitButton.on("click", function() {
      console.log("A")
      destinationInputValue = $textInput.val().trim();
      window.destinationInputValue = destinationInputValue;
      if (destinationInputValue.length > 0) {
        //マーカーを全て削除する
        if (window.markers.length > 0) {
          window.markers.forEach((marker) => {
            marker.setMap(null); // マーカーをマップから削除
          });
          window.markers = []; // マーカー配列をクリア
        }
        //loading.gifを表示する
        const loadingElements = document.getElementsByClassName("loading-container");
        const loadingElement = loadingElements[0]; // 最初の要素を選択
        loadingElement.classList.remove("hidden");

      }
    });

});
});