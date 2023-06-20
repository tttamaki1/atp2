document.addEventListener("turbolinks:load", () => {$(function() {
    var deleteIcons = document.getElementsByClassName('delete_icon');

    for (var i = 0; i < deleteIcons.length; i++) {
    deleteIcons[i].addEventListener('click', function() {
        this.parentElement.querySelector('.form-control').value = '';
    });
    }
});
});