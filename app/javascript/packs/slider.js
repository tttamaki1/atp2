import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

document.addEventListener("turbolinks:load", function() {
  const slider = document.getElementById('budget-slider');
  const sliderValue = document.getElementById('budget-slider-value');

  let defaultMax;
  let max;
  let step;
  if (window.selectedLanguage == "ja") {
    defaultMax = 10000
    max = 100000
    step = 1000
  } else if (window.selectedLanguage == "zh-CN"){
    defaultMax = 50
    max = 500
    step = 5
  } else if (window.selectedLanguage == "en"){
    defaultMax = 70
    max = 700
    step = 5
  } else {
      ;
  };

  if (slider) {
    noUiSlider.create(slider, {
      start: [0, defaultMax], // 初期範囲
      range: {
        'min': 0,
        'max': max
      },
      step: step, // ステップ
      connect: true // 範囲をつなげる
    });

    slider.noUiSlider.on('update', function(values, handle) {
      const rangeValues = slider.noUiSlider.get(); // 選択範囲の値を取得
      const min = parseInt(rangeValues[0], 10); // 小数部分を切り捨てて整数に変換
      const max = parseInt(rangeValues[1], 10);
      if (min == 0 && max == 0) {
        sliderValue.textContent = 0;
      } else if (min ==  max ) {
        sliderValue.textContent = max;
      } else {
        sliderValue.textContent = min.toLocaleString() + "  -  " + max.toLocaleString(); // 選択範囲の値を表示する要素の更新
      }
    });
  }
});
