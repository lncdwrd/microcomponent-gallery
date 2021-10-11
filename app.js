const lightbox = (function () {
  const createLightbox = (html) => {
    const lightboxElement =  document.createElement('div');

    lightboxElement.id = 'js-lightbox';

    lightboxElement.className = 'fade-in';
    
    lightboxElement.innerHTML = html;

    return lightboxElement;
  }

  const renderLightbox = (html) => {
    const elem = createLightbox(html);

    document.body.appendChild(elem);
  }

  const closableLightbox = () => {
    document.body.addEventListener('click', (e) => {
      const elem = e.target;

      if (elem.id === 'js-lightbox') {
        elem.remove();

        setScrolling('enabled');
      }
    });
  };

  const setScrolling = (state) => {
    if (state === 'disabled') {
      document.body.classList.add('scrolling__disabled');
    } else if (state === 'enabled') {
      document.body.classList.remove('scrolling__disabled');
    }
  }

  return {
    show(html) {
      renderLightbox(html);

      setScrolling('disabled');

      return this;
    },

    closable() {
      closableLightbox();
      
      return this;
    }
  }
})();



// Events
const images = document.querySelectorAll('.js-image');

images.forEach(image => {
  image.addEventListener('click', (e) => {
    const src = e.target.src;

    lightbox.show(`
      <img src="${src}" class="js-lightbox-image scale-in" width="520" height="345">
    `).closable();
  });
});

