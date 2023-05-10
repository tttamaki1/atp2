document.addEventListener("DOMContentLoaded", () => {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      darkModeButton.textContent = "light";
    } else {
      darkModeButton.textContent = "dark";
    }
  };

  const darkModeButton = document.getElementById("dark-mode-toggle");
  darkModeButton.addEventListener("click", toggleDarkMode);
});
