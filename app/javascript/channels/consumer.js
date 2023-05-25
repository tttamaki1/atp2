// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.

import { createConsumer } from "@rails/actioncable"
import { v4 as uuidv4 } from 'uuid';
// export default createConsumer()

let tabSessionId = sessionStorage.getItem('tabSessionId');
if (!tabSessionId) {
  tabSessionId = uuidv4();
  sessionStorage.setItem('tabSessionId', tabSessionId);
}
export default createConsumer(`/cable?tab_session_id=${tabSessionId}`);