import consumer from "./consumer"

let isFirstTime = true;

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
      if (isFirstTime) {
        //loading.gifの表示を止める
        const loadingElements = document.getElementsByClassName("loading");
        const loadingElement = loadingElements[0]; // 最初の要素を選択
        loadingElement.classList.add("hidden");
        isFirstTime = false
      } 
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