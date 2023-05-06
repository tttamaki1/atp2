document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
  
    if (searchInput) {
      searchInput.addEventListener('focusout', (event) => {
        event.target.form.submit();
      });
    }
  
    if (searchIcon) {
      searchIcon.addEventListener('click', (event) => {
        const form = document.querySelector('.search-form');
        if (form) {
          form.submit();
        }
      });
    }
  });
  