const toggleLightbox = function toggler(item) {
  item.target.classList.toggle('lightbox--opened');
}

const initLightbox = function init(className) {
  let lightboxImage = document.querySelectorAll(className);
  lightboxImage.forEach((item) => {
    if (item.classList) {
      item.classList.add('lightbox--closed');
    } else {
      item.className += ' lightbox--closed';
    }
    item.addEventListener('click', toggleLightbox);
  })
}

module.exports = initLightbox;