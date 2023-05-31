import { createConsumer } from "@rails/actioncable"
import { v4 as uuidv4 } from 'uuid';

let tabSessionId = sessionStorage.getItem('tabSessionId');

window.addEventListener("turbolinks:load", function() {
  // すべてのサブスクリプションを解除
    consumer.subscriptions.subscriptions.forEach(function(subscription) {
      subscription.unsubscribe();
    });
    
    // tabSessionIdを削除
    sessionStorage.removeItem('tabSessionId');
});

if (!tabSessionId) {
  tabSessionId = uuidv4();
  sessionStorage.setItem('tabSessionId', tabSessionId);
}

const consumer = createConsumer(`/cable?tab_session_id=${tabSessionId}`);
export { consumer, tabSessionId };