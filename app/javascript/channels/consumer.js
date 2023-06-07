import { createConsumer } from "@rails/actioncable";
import { v4 as uuidv4 } from 'uuid';

let consumer; // consumer変数をグローバルスコープで定義
let pageSessionId; // pageSessionId変数をグローバルスコープで定義

document.addEventListener("turbolinks:load", function() {

  // すべてのサブスクリプションを解除
  if (consumer && consumer.subscriptions) {
    consumer.subscriptions.subscriptions.forEach(function(subscription) {
      subscription.unsubscribe();
      // pageSessionIdを削除
      sessionStorage.removeItem('pageSessionId');
    });
  }
  
  pageSessionId = sessionStorage.getItem('pageSessionId');


  pageSessionId = uuidv4();
  sessionStorage.setItem('pageSessionId', pageSessionId);


  consumer = createConsumer(`/cable?page_session_id=${pageSessionId}`); // consumerを初期化
});

window.addEventListener("turbolinks:before-visit", function() {

});

export { consumer, pageSessionId };
