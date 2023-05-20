document.addEventListener("turbolinks:load", () => {
  const toggleDarkMode = () => {
    const darkModeButton = document.getElementById("dark-mode-toggle");
    const moonIcon = darkModeButton.querySelector(".fa-moon");
    const sunIcon = darkModeButton.querySelector(".fa-sun");

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      darkModeButton.textContent = "ライトモード";
      // moonIcon.classList.add("hidden");
      // sunIcon.classList.remove("hidden");
      sessionStorage.setItem("darkMode", "enabled");
    } else {
      darkModeButton.textContent = "ダークモード";
      // moonIcon.classList.remove("hidden");
      // sunIcon.classList.add("hidden");
      sessionStorage.setItem("darkMode", "disabled");
    }
  };

  const darkModeButton = document.getElementById("dark-mode-toggle");
  darkModeButton.addEventListener("click", toggleDarkMode);

  // ダークモード設定の読み込み
  const darkModeSetting = sessionStorage.getItem("darkMode");
  if (darkModeSetting === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeButton.textContent = "ライトモード";
  } else {
    darkModeButton.textContent = "ダークモード";
  }
});
