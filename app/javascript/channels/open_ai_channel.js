import consumer from "../channels/consumer"

consumer.subscriptions.create("OpenAiChannel", {
  connected() {
    console.log("Connected to OpenAiChannel!");
  },

  disconnected() {
    console.log("Disconnected from OpenAiChannel");
  },

  received(data) {
    console.log('Received data:', data);
    const elementToUpdate = document.getElementById("element-to-update");
    if (elementToUpdate && data != null) {
      const content = elementToUpdate.innerHTML  + data.replace(/ /g, '<br>');
      elementToUpdate.innerHTML  = content;
    }
  }

});

window.addEventListener("beforeunload", () => {
  openAiChannel.unsubscribe();
});