
document.addEventListener("turbolinks:load", function () {

  // HTML から select タグを取得
  const languageSelect = document.querySelector('.language-select');

  // 選択されている言語の値を取得
  window.selectedLanguage = languageSelect.value;

  // ブラウザの言語を設定
  navigator.language = window.selectedLanguage;

  window.scrollTo(0, 0);

  if (document.querySelector(".generated-plan-container")) {
    const slider = document.getElementById("day-slider");
    const sliderValue = document.getElementById("day-slider-value");
    const budgetCheckbox = document.getElementById("budget-option");
    const budgetInput = document.getElementById("budget-input");
    const budgetSlider = document.getElementById("budget-slider");
    const budgetSliderValue = document.getElementById("budget-slider-value");  



    slider.addEventListener("input", function () {
      sliderValue.textContent = slider.value;
    });


    budgetSlider.addEventListener("input", function () {
      budgetSliderValue.textContent = budgetSlider.value;
    });

    budgetCheckbox.addEventListener("change", function () {
      if (budgetCheckbox.checked) {
        budgetInput.style.display = "block";
      } else {
        budgetInput.style.display = "none";
      }
    });

    budgetSlider.min = 0;
    budgetSlider.max = 200000;
    
    budgetSlider.addEventListener("input", function() {
      let value = budgetSlider.value;
      let step = 0;
      if (value <= 50000) {
        step = 1000;
      } else if (value <= 100000) {
        step = 5000;
      } else {
        step = 10000;
      }
      budgetSlider.step = step;

    });

    function displayBudgetValue(value) {
      const sliderValue = document.getElementById("budget-slider-value");
      sliderValue.textContent = new Intl.NumberFormat('ja-JP').format(value);
    
    }
  }
});
