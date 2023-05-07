$(function() {
  $('.select_control').on('change', function() {
    if ($(this).val() == '1') {
      $(this).addClass('font-light');
    } else {
      $(this).removeClass('font-light');
    }
  });
});