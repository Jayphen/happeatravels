const toggleLightbox = function toggler(item) {
  item.target.classList.toggle('lightbox--opened');
}

const addLightboxClass = function (item) {
    if (item.classList) {
      item.classList.add('lightbox--closed');
    } else {
      item.className += ' lightbox--closed';
    }
}

const closeOnEsc = function (event) {
  if (event.keyCode === 27) {
    let openLightboxes = document.querySelector('.lightbox--opened');

    if (openLightboxes) {
      openLightboxes.classList.toggle('lightbox--opened');
    }
  }
}

const navOnArrowKey = function (event) {
  let currentlyActive = document.querySelector('.lightbox--opened');
  let previousEl = [];

  if (event.keyCode === 37) {
    if (currentlyActive.parentNode.previousElementSibling) {
      previousEl = currentlyActive.parentNode.previousElementSibling.querySelector('.lightbox--closed');
    } else {
      previousEl = currentlyActive.parentNode.parentNode.querySelectorAll('.lightbox--closed');
      previousEl = previousEl[previousEl.length - 1];
    }
    currentlyActive.classList.toggle('lightbox--opened');
    previousEl.classList.toggle('lightbox--opened');
  }
}

const initLightbox = function init(className) {
  let lightboxImage = document.querySelectorAll(className);
  lightboxImage.forEach((item) => {
    addLightboxClass(item);
    item.addEventListener('click', toggleLightbox);
  });

  document.addEventListener('keyup', closeOnEsc);
  document.addEventListener('keyup', navOnArrowKey);
}

module.exports = initLightbox;

// $(document).on('keyup', function(event) {
//   if ($('img.lightbox--opened').length !== 0) {
//     if (event.keyCode === 27) {
//       $('.lightbox--opened').removeClass('lightbox--opened');
//       $(document).off('touchmove');
//     } else if (event.keyCode === 37 || event.keyCode === 39) {
//       var elements = $('img.lightbox');
//       var element = $(elements[elements.index($('img.lightbox--opened')) + (event.keyCode === 37 ? -1 : +1)]);
//       if (element.length !== 0) {
//         elements.removeClass('lightbox--opened')
//         element.addClass('lightbox--opened')
//       }
//     }
//   }
// });