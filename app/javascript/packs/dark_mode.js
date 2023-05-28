document.addEventListener("turbolinks:load", () => {
  const toggleDarkMode = () => {
    const darkModeButton = document.getElementById("dark-mode-toggle");
    const darkMode = darkModeButton.querySelector(".dark-text");
    const lightMode = darkModeButton.querySelector(".light-text");

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      darkMode.style.display = "none";
      lightMode.style.display = "inline-block";
      sessionStorage.setItem("darkMode", "enabled");
    } else {
      darkMode.style.display = "inline-block";
      lightMode.style.display = "none";
      sessionStorage.setItem("darkMode", "disabled");
    }
  };

  const darkModeButton = document.getElementById("dark-mode-toggle");
  darkModeButton.addEventListener("click", toggleDarkMode);

  // ダークモード設定の読み込み
  const darkModeSetting = sessionStorage.getItem("darkMode");
  if (darkModeSetting === "enabled") {
    document.body.classList.add("dark-mode");
    const darkModeText = document.querySelector(".dark-text");
    const lightModeText = document.querySelector(".light-text");
    darkModeText.style.display = "none";
    lightModeText.style.display = "inline-block";
  } else {
    const darkModeText = document.querySelector(".dark-text");
    const lightModeText = document.querySelector(".light-text");
    darkModeText.style.display = "inline-block";
    lightModeText.style.display = "none";
  }
});
