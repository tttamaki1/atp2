import flatpickr from "flatpickr";
import { Japanese } from "flatpickr/dist/l10n/ja.js";
import { ChineseSimplified } from "flatpickr/dist/l10n/zh.js";
import { English } from "flatpickr/dist/l10n/default.js";

document.addEventListener("turbolinks:load", function(){

    let locale
    if (window.selectedLanguage == "ja") {
        locale = Japanese
    } else if (window.selectedLanguage == "zh-CN"){
        locale = ChineseSimplified
    } else if (window.selectedLanguage == "en"){
        locale = English    
    } else {
        ;
    };

    let selectedDates = []; // 選択された日付を格納する配列

    flatpickr(".datepicker", {
        locale: locale,
        mode: "range",
        minDate: "today",
        conjunction: " - ",
        onValueUpdate: function(selectedDates, dateStr, instance) {
            // 選択された日付の数が最大2つを超える場合、最初に選択された日付を配列から削除
            if (selectedDates.length > 2) {
                console.log("AAA")
                // 日付を昇順にソートする
                selectedDates.sort(function(a, b) {
                    return a.getTime() - b.getTime();
                });

                const removedDate = selectedDates.shift();
                instance.clear(removedDate);

                const startDate = selectedDates[0];
                const endDate = selectedDates[selectedDates.length - 1];
      
                // 選択範囲の日付要素にカラーリングクラスを追加する
                instance.calendarContainer.querySelectorAll(".flatpickr-day").forEach(function(element) {
                  const date = instance.parseDate(element.dataset.date, "Y-m-d");
                  if (date >= startDate && date <= endDate) {
                    element.classList.add("selected-range");
                  }
                });

            }

            // 選択された日付をセットする前に、日付を昇順にソートする
            selectedDates = selectedDates.sort(function(a, b) {
                return a.getTime() - b.getTime();
            });

            // ソートされた日付をテキストボックスにセットする
            instance.input.value = selectedDates.map(function(date) {
                return instance.formatDate(date, instance.config.dateFormat);
            }).join(instance.config.conjunction);
        }
    });
});
