import { consumer, pageSessionId } from "./consumer";

document.addEventListener("turbolinks:load", function() {
  consumer.subscriptions.create(
    { channel: 'InspirationGuideChannel', page_session_id: pageSessionId },
    {
    connected() {
      console.log("Connected to Channel 3 :"+ pageSessionId);

    },

    disconnected() {
      console.log("Disconnected from Channel 3 :"+ pageSessionId);
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