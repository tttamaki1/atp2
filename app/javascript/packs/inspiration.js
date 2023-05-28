document.addEventListener("turbolinks:load", () => {
    
    const promptElements = document.querySelectorAll('.prompt-box');
  
    promptElements.forEach((element) => {
        element.addEventListener('click', () => {
            const textbox = document.getElementById('place');
            if (textbox.value !== "") {
                document.getElementsByClassName('container-index-inspiration')[0].classList.add('slide-fade-out');
            }
        });
    });

    // マウスオーバー時にprompt_valueの値を更新する関数
    function updatePromptValue(value) {
      document.getElementById('prompt-value').value = value;
    }

    // prompt-boxクラスの要素にマウスオーバー時のイベントリスナーを追加
    var promptBoxes = document.getElementsByClassName('prompt-box');
    Array.from(promptBoxes).forEach(function(promptBox) {
      promptBox.addEventListener('mouseover', function() {
        var value = this.getAttribute('value'); // value属性の値を取得
        updatePromptValue(value); // prompt_valueの値を更新
      });
    });



  });