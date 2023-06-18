import noUiSlider from 'nouislider';

document.addEventListener("turbolinks:load", function() {

  if (document.querySelector(".container-hotel")) {  
    const slider = document.getElementById('budget-slider');
    const sliderValue = document.getElementById('budget-slider-value');

    let defaultMax;
    let max;
    let step;
    if (window.selectedLanguage == "ja") {
        defaultMax = 10000;
        max = 100000;
        step = 1000;
    } else if (window.selectedLanguage == "zh-CN") {
        defaultMax = 50;
        max = 500;
        step = 5;
    } else if (window.selectedLanguage == "en") {
        defaultMax = 70;
        max = 700;
        step = 5;
    }

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
            const min = parseInt(rangeValues[0], 10).toLocaleString(); // 小数部分を切り捨てて整数に変換
            const max = parseInt(rangeValues[1], 10).toLocaleString();
            if (min === '0' && max === '0') {
                sliderValue.textContent = '0';
            } else if (min === max) {
                sliderValue.textContent = max;
            } else {
                sliderValue.textContent = min.toLocaleString() + "  -  " + max.toLocaleString(); // 選択範囲の値を表示する要素の更新
            }
        });
    }
  }

  if (document.querySelector(".generated-plan-container")) {
    const daySlider = document.getElementById("day-slider");
    const sliderValue = document.getElementById("day-slider-display");
    const daySliderValue = document.getElementById("day-slider-value");
    if (daySlider) {

        noUiSlider.create(daySlider, {
            start: [1], // 初期範囲
            range: {
                'min': 1,
                'max': 7
            },
            step: 1 // ステップ
        });

        daySlider.noUiSlider.on('update', function(values, handle) {
            const rangeValues = daySlider.noUiSlider.get(); // 選択範囲の値を取得
            sliderValue.textContent = parseInt(rangeValues, 10);

            // day-sliderの値を取得してhiddenフィールドに設定する
            daySliderValue.value = values[handle];
        });
    }
  }
});
