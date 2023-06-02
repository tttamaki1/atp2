import { consumer, tabSessionId } from "./consumer";

document.addEventListener("turbolinks:load", function() {
  consumer.subscriptions.create(
    { channel: 'InspirationGuideChannel', tab_session_id: tabSessionId },
    {
    connected() {
      console.log("Connected to Channel 3 :"+ tabSessionId);

    },

    disconnected() {
      console.log("Disconnected from Channel 3 :"+ tabSessionId);
    },

    received(data) {
      const response = document.getElementById("response");
      if (response && data != null) {
        const content = response.innerHTML  + data;
        response.innerHTML  = content;
      }
    }

  });
});