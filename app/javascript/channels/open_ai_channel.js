import { consumer, tabSessionId } from "./consumer";

let isFirstTime = true;
let lastReceivedAt = null;
let timeout = null;
const TIMEOUT_DURATION = 5000; // タイムアウトまでの時間（ミリ秒）
document.addEventListener("turbolinks:load", function() {
  consumer.subscriptions.create(
    { channel: 'OpenAiChannel', tab_session_id: tabSessionId },
    {
    connected() {
      console.log("Connected to OpenAiChannel:"+ tabSessionId);
      lastReceivedAt = Date.now(); // 接続時刻を初期化
      startTimeout(); // タイムアウト処理を開始
    },

    disconnected() {
      console.log("Disconnected from OpenAiChannel:"+ tabSessionId);
      stopTimeout(); // タイムアウト処理を停止
    },

    received(data) {
      // console.log('Received data:', data);
      const elementToUpdate = document.getElementById("element-to-update");
      if (elementToUpdate && data != null) {
        if (isFirstTime) {
          const loadingElements = document.getElementsByClassName("loading-container");
          const loadingElement = loadingElements[0]; // 最初の要素を選択
          loadingElement.classList.add("hidden");
          isFirstTime = false
        }
        const content = elementToUpdate.innerHTML  + data;
        elementToUpdate.innerHTML  = content;
        lastReceivedAt = Date.now(); // 最新の受信時刻を更新 
      }
    }

  });
});
function resetIsFirstTime() {
  isFirstTime = true;
}

function startTimeout() {
  stopTimeout(); // タイムアウト処理が開始されていた場合は停止する
  timeout = setTimeout(() => {
    consumer.subscriptions.subscriptions.forEach((subscription) => {
      resetIsFirstTime();
    });
  }, TIMEOUT_DURATION);
}

function stopTimeout() {
  clearTimeout(timeout); // タイムアウト処理を停止する
}

setInterval(() => {
  if (lastReceivedAt && Date.now() - lastReceivedAt > TIMEOUT_DURATION) {
    consumer.subscriptions.subscriptions.forEach((subscription) => {
      resetIsFirstTime();
    });
  }
}, TIMEOUT_DURATION);

