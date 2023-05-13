
document.addEventListener("DOMContentLoaded", function () {
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

  function displayValue(value) {
    sliderValue.textContent = value;
  }

  function displayValue(value) {
    budgetSliderValue.textContent = value;
    
  }

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
    var value = budgetSlider.value;
    var step = 0;
    if (value <= 50000) {
      step = 1000;
    } else if (value <= 100000) {
      step = 5000;
    } else {
      step = 10000;
    }
    budgetSlider.step = step;

  });

  
  var signupButton = document.querySelector('.signup');
  var signupForm = document.querySelector('.signup-form');
  var loginButton = document.querySelector('.login');
  var loginForm = document.querySelector('.login-form');
  var documentBody = document.body;
  
  signupButton.addEventListener('mouseover', function() {
    signupForm.classList.remove('display');
    loginForm.classList.add('display');
    signupForm.classList.add('text-color');
  });
  loginButton.addEventListener('mouseover', function() {
    loginForm.classList.remove('display');
    signupForm.classList.add('display');
    loginForm.classList.add('text-color');
  });


  documentBody.addEventListener('click', function(event) {
    // クリックボタン、フォーム以外の領域をクリックした時にフォームを非表示にする
    if (event.target !== signupButton && !signupForm.contains(event.target) ){
      signupForm.classList.add('display');
      signupForm.classList.remove('text-color');
    }
    if (event.target !== loginButton && !loginForm.contains(event.target) ){
      loginForm.classList.add('display');
      loginForm.classList.remove('text-color');
    }
  });
  

});

function displayBudgetValue(value) {
  const sliderValue = document.getElementById("budget-slider-value");
  sliderValue.textContent = new Intl.NumberFormat('ja-JP').format(value);

}

