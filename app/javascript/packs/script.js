
document.addEventListener("turbolinks:load", function () {

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

    function displayBudgetValue(value) {
      const sliderValue = document.getElementById("budget-slider-value");
      sliderValue.textContent = new Intl.NumberFormat('ja-JP').format(value);
    
    }
  }
});



// サーバーからの配信を止める方法が分からない
// window.addEventListener('beforeunload', () => {
//   consumer.subscriptions.subscriptions.forEach((subscription) => {
//     if (subscription.identifier === '{"channel":"OpenAiChannel","tab_session_id":"' + sessionStorage.getItem('tabSessionId') + '"}') {
//       subscription.unsubscribe();
//     }
//     if (subscription.identifier === '{"channel":"SecondChannel","tab_session_id":"' + sessionStorage.getItem('tabSessionId') + '"}') {
//       subscription.unsubscribe();
//     }
//     if (subscription.identifier === '{"channel":"InspirationGuideChannel","tab_session_id":"' + sessionStorage.getItem('tabSessionId') + '"}') {
//       subscription.unsubscribe();
//     }
//   });
// });
