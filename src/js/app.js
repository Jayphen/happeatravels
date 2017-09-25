// JS Goes here - ES6 supported
// main.js
(function() {
  const imagesLoaded = require('imagesloaded');
  const finalImage = document.querySelector('.full-image');

  imagesLoaded( '.blog-post', function() {
    finalImage.classList.toggle('o-0');
  })
})(window);
