import { createConsumer } from "@rails/actioncable";
import { v4 as uuidv4 } from 'uuid';

let consumer; // consumer変数をグローバルスコープで定義
let tabSessionId; // tabSessionId変数をグローバルスコープで定義

document.addEventListener("turbolinks:load", function() {

  // すべてのサブスクリプションを解除
  if (consumer && consumer.subscriptions) {
    consumer.subscriptions.subscriptions.forEach(function(subscription) {
      subscription.unsubscribe();
      // tabSessionIdを削除
      sessionStorage.removeItem('tabSessionId');
    });
  }
  
  tabSessionId = sessionStorage.getItem('tabSessionId');


  tabSessionId = uuidv4();
  sessionStorage.setItem('tabSessionId', tabSessionId);


  consumer = createConsumer(`/cable?tab_session_id=${tabSessionId}`); // consumerを初期化
});

window.addEventListener("turbolinks:before-visit", function() {

});

export { consumer, tabSessionId };
