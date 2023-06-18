global.$ = global.jQuery = require('jquery');
$(document).on('turbolinks:load', function() {
    $('.submit-button').on('click', function(e) {
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
    
  });

window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY;
  var element = document.querySelector('.map-container');
  element.style.transform = 'translateY(' + scrollPosition + 'px)';
});