document.addEventListener("DOMContentLoaded", () => {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      darkModeButton.textContent = "light";
      localStorage.setItem("darkMode", "enabled");
    } else {
      darkModeButton.textContent = "dark";
      localStorage.setItem("darkMode", "disabled");
    }
  };

  const darkModeButton = document.getElementById("dark-mode-toggle");
  darkModeButton.addEventListener("click", toggleDarkMode);


 // ダークモード設定の読み込み
 const darkModeSetting = localStorage.getItem("darkMode");
 if (darkModeSetting === "enabled") {
   document.body.classList.add("dark-mode");
 }

});



