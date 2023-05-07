$(document).on('turbolinks:load', function() {
    $('.submit-button').on('click', function(e) {
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
  });