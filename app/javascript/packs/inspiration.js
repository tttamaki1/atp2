document.addEventListener("turbolinks:load", () => {
    const textbox = document.getElementById('place');
    const promptElements = document.querySelectorAll('.prompt-text');
  
    promptElements.forEach((element) => {
      element.addEventListener('mouseover', () => {
        textbox.classList.add('active');
      });
  
      element.addEventListener('mouseout', () => {
        textbox.classList.add('active');
      });
    });
  });