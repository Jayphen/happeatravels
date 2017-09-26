const imagesLoaded = require('imagesloaded');

const finalImage = document.querySelector('.full-image');

if (finalImage)
  imagesLoaded( '.blog-post', function() {
    // Remove 0 opacity on the full image to reveal it
    finalImage.classList.toggle('o-0');
  });