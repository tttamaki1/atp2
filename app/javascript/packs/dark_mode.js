document.addEventListener("DOMContentLoaded", () => {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      // darkModeButton.textContent = "light";
      localStorage.setItem("darkMode", "enabled");
      modeIcon.remove("fa-solid fa-sun-bright")
      modeIcon.add("fa-regular fa-moon")
    } else {
      // darkModeButton.textContent = "dark";
      localStorage.setItem("darkMode", "disabled");
      modeIcon.remove("fa-regular fa-moon")
      modeIcon.add("fa-solid fa-sun-bright")
    }
  };

  const darkModeButton = document.getElementById("dark-mode-toggle");
  darkModeButton.addEventListener("click", toggleDarkMode);
  const modeIcon = document.getElementsByClassName("mode-icon")[0];

 // ダークモード設定の読み込み
 const darkModeSetting = localStorage.getItem("darkMode");
 if (darkModeSetting === "enabled") {
   document.body.classList.add("dark-mode");
   modeIcon.add("fa-solid fa-sun-bright")

 }

});



