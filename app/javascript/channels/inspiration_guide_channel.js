import consumer from "./consumer"

consumer.subscriptions.create(
  { channel: 'InspirationGuideChannel', tab_session_id: sessionStorage.getItem('tabSessionId') },
  {
  connected() {
    console.log("Connected to InspirationGuideChannel");
  },

  disconnected() {
    console.log("Disconnected from InspirationGuideChannel");
  },

  received(data) {
    const response = document.getElementById("response");
    if (response && data != null) {
      const content = response.innerHTML  + data;
      response.innerHTML  = content;
    }
  }

});
