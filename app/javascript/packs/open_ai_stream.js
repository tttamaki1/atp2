// import consumer from "../channels/consumer"

// const elementToUpdate = document.getElementById("element-to-update");
// // console.log(elementToUpdate);
// if (elementToUpdate) {
//   consumer.subscriptions.create("OpenAiChannel", {
//     connected() {
//       console.log("Connected to OpenAiChannel");
//     },

//     disconnected() {
//       // Called when the subscription has been terminated by the server
//     },

//     received(data) {
//       // Called when there's incoming data on the WebSocket for this channel
//       console.log(data);
//       elementToUpdate.innerHTML = data;
//     },
//   });
// }