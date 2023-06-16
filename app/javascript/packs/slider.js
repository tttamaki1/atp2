import noUiSlider from 'nouislider';

document.addEventListener("turbolinks:load", function() {
  const slider = document.getElementById("budget-slider");
  const sliderValue = document.getElementById("budget-slider-value");

  noUiSlider.create(slider, {
    start: [5000], // 初期値
    connect: [true, false], // スライダーハンドルをつなげる
    range: {
      'min': 0,
      'max': 20000
    },
    step: 1000, // 初期ステップ
    pips: {
      mode: 'positions',
      values: [0, 25, 50, 75, 100],
      density: 4
    }
  });

  slider.noUiSlider.on('update', function(values, handle) {
    const value = parseFloat(values[handle]);

    let step = 0;
    if (value <= 5000) {
      step = 1000;
    } else if (value <= 10000) {
      step = 5000;
    } else {
      step = 10000;
    }

    slider.noUiSlider.updateOptions({
      step: step // ステップを更新
    });

    sliderValue.textContent = value.toLocaleString(); // 選択値を表示する要素の更新
  });
});
