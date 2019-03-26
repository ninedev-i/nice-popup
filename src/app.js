'use strict';
import {Controls} from './controls';
import './app.less'

class NicePopup {
   constructor(cfg) {
      this.light_gallery = document.querySelectorAll('.light_gallery');
      this.wrapper = null;
      this.imageWrapper = null;
      this.openedImageNumber = null;

      this.showArrows = true;

      if (this.light_gallery.length > 1)
      this.controls = new Controls({
         gallery: this,
         showArrows: this.showArrows
      });

      document.addEventListener('click', this.openImage.bind(this));
   }

   /**
    * Открытие картинки
    */
   openImage(ev) {
      let link = ev.target.parentElement;

      if (!link || !link.hasAttribute('data-light')) {
         return;
      }
      ev.preventDefault();

      this.getOpenedImageNumber(link);
      this.addWrapper();

      let imageUrl = link.getAttribute('href');
      this.createImage(imageUrl);
   }

   /**
    * Добавим подложку
    */
   addWrapper() {
      this.wrapper = document.createElement('div');
      this.wrapper.className = 'light-wrapper';

      let background = document.createElement('div');
      background.className = 'light-wrapper-background';

      document.body.appendChild(this.wrapper);
      this.wrapper.appendChild(background);
   }

   /**
    * Создадим картинку на подложке
    */
   createImage(imageUrl) {
      let container = document.createElement('div');
      container.className = 'light-image-container';

      this.wrapper.appendChild(container);
      if (this.controls) {
         this.controls.addArrows();
      }
      this.insertImage(container, imageUrl);
   }

   /**
    * Вставим в контейнер изображение нужной высоты
    */
   insertImage(container, src, fromRight) {
      let transformClassName;
      switch (fromRight) {
         case true:
            transformClassName = 'light-animation-right-fadeIn';
            break;
         case false:
            transformClassName = 'light-animation-left-fadeIn';
            break;
         default:
            transformClassName = '';
      }

      this.imageWrapper = document.createElement('div');
      this.imageWrapper.className = 'light-image-wrapper';
      this.imageWrapper.innerHTML = `<img src="${src}" class="light-image ${transformClassName}">`;
      container.appendChild(this.imageWrapper);

      this.imageWrapper.addEventListener('click', (ev) => {
         if (ev.target.className.search('light-image-wrapper') >= 0) {
            this.close();
         }
      });
   }

   /**
    * Удалим картинку с анимацией
    */
   removeImage(toRight) {
      this.imageWrapper.className += ' oldWrapper';
      let oldWrapper = document.querySelector('.oldWrapper');
      switch(toRight) {
         case true:
            document.querySelector('.light-image').className = 'light-image light-animation-left-fadeOut';
            setTimeout(() => {
               oldWrapper.remove();
            }, 300);
            break;
         case false:
            document.querySelector('.light-image').className = 'light-image light-animation-right-fadeOut';
            setTimeout(() => {
               oldWrapper.remove();
            }, 300);
            break;
         default:
            oldWrapper.remove();
      }
   }

   /**
    * Закрыть галерею
    */
   close() {
      document.body.removeChild(this.wrapper);
   }

   /**
    * Откроем следующую картинку
    */
   nextImage(iterator = 1, repeatImage = this.light_gallery[0], repeatImageNumber = 0, slideToRight = true) {
      let container = document.querySelector('.light-image-container');

      // Удалим текущую картинку
      this.removeImage(iterator === 1);

      let nextImg = this.light_gallery[this.openedImageNumber + iterator];
      if (nextImg) {
         this.insertImage(container, nextImg.href, slideToRight);
         this.openedImageNumber = this.openedImageNumber + iterator;
      } else {
         this.insertImage(container, repeatImage, slideToRight);
         this.openedImageNumber = repeatImageNumber;
      }
   }

   /**
    * Откроем предыдущую картинку
    */
   previousImage() {
      this.nextImage(-1, this.light_gallery[this.light_gallery.length - 1], this.light_gallery.length - 1, false);
   }



   /**
    * Вычислим номер картинки
    */
   getOpenedImageNumber(link) {
      this.light_gallery.forEach((img, i) => {
         if (img.href === link.href) {
            this.openedImageNumber = i;
         }
      })
   }
}

if (document) {
   document.__proto__.LightGallery = LightGallery;
}

export {NicePopup}
