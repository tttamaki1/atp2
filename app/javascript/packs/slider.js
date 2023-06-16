import noUiSlider from 'nouislider';

document.addEventListener("turbolinks:load", function() {
  const slider = document.getElementById("budget-slider");
  const sliderValue = document.getElementById("budget-slider-value");


  noUiSlider.create(range, {
  
      range: {
          'min': 0,
          'max': 10
      },
      step: 1,
      start: [2, 4],
      connect: true,
      behaviour: 'tap-drag',
      pips: {
          mode: 'steps',
          stepped: true,
          density: 10
      }
  });
});
