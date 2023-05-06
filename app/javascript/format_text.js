document.addEventListener("DOMContentLoaded", function() {
  const submitButton = document.querySelector(".submit-button");
  const elementToUpdate = document.getElementById("element-to-update");

  submitButton.addEventListener("click", function(event) {
    elementToUpdate.textContent = "";
  });
});