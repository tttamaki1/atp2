document.addEventListener("turbolinks:load", () => {$(function() {
    if (window.matchMedia("(max-width: 600px)").matches) {
        const element = document.getElementById('submit-button');
        const inputElement = document.getElementsByClassName('input')[0];

        element.addEventListener('click', () => {
            const textbox = document.getElementById('destination-input');
            if (textbox.value !== "") {
                inputElement.classList.add('slide-fade-out-to-down');
            }

            inputElement.addEventListener('animationend', () => {
                inputElement.style.display = 'none';
            });
        });


    }
});
});
