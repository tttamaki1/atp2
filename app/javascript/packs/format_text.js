document.addEventListener("DOMContentLoaded", function() {
  const submitButtons = document.querySelectorAll(".submit-button");
  const elementToUpdate = document.getElementById("element-to-update");
  const loadingElements = document.getElementsByClassName("loading");
  const loadingElement = loadingElements[0]; // 最初の要素を選択
 
  submitButtons.forEach(function(submitButton) {
    submitButton.addEventListener("click", function(event) {
      elementToUpdate.textContent = "";
      loadingElement.classList.remove("hidden");
    });
  });
});
