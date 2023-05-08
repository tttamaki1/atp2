import consumer from "./consumer"

consumer.subscriptions.create("OpenAiChannel", {
  connected() {
    console.log("Connected to OpenAiChannel");
  },

  disconnected() {
    console.log("Disconnected from OpenAiChannel");
  },

  received(data) {
    // console.log('Received data:', data);
    const elementToUpdate = document.getElementById("element-to-update");
    if (elementToUpdate && data != null) {
      const content = elementToUpdate.innerHTML  + data;
      elementToUpdate.innerHTML  = content;
    }
  }

});

document.addEventListener('turbolinks:before-visit', () => {
  openAiChannel.unsubscribe();
  secondChannel.unsubscribe();
});

window.addEventListener("beforeunload", () => {
  console.log("Unsubscribing from OpenAiChannel");
  openAiChannel.unsubscribe();
  secondChannel.unsubscribe();
});