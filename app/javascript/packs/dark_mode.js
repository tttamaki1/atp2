document.addEventListener("turbolinks:load", () => {
  let linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.type = "text/css";
  const toggleDarkMode = () => {
    const darkModeButton = document.getElementById("dark-mode-toggle");
    const darkMode = darkModeButton.querySelector(".dark-text");
    const lightMode = darkModeButton.querySelector(".light-text");

    const selectedLanguage = document.getElementById("language-select");

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      darkMode.style.display = "none";
      lightMode.style.display = "inline-block";
      sessionStorage.setItem("darkMode", "enabled");

      if (window.matchMedia("(max-width: 600px)").matches) {
        selectedLanguage.style.fontSize = "12px"
      }

      linkElement.href = "https://npmcdn.com/flatpickr/dist/themes/dark.css";
      document.head.appendChild(linkElement);
    } else {
      darkMode.style.display = "inline-block";
      lightMode.style.display = "none";
      sessionStorage.setItem("darkMode", "disabled");

      linkElement.href = "https://npmcdn.com/flatpickr/dist/themes/material_green.css";
      document.head.appendChild(linkElement);
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

    linkElement.href = "https://npmcdn.com/flatpickr/dist/themes/dark.css";
    document.head.appendChild(linkElement);
  

  } else {
    const darkModeText = document.querySelector(".dark-text");
    const lightModeText = document.querySelector(".light-text");
    darkModeText.style.display = "inline-block";
    lightModeText.style.display = "none";

    linkElement.href = "https://npmcdn.com/flatpickr/dist/themes/material_green.css";
    document.head.appendChild(linkElement);
  }

});
