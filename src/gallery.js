'use strict';
import {Controls} from './controls';

export class Gallery {
   constructor(cfg) {
      this.light_gallery = document.querySelectorAll('[data-nice="gallery"]');
      this.wrapper = document.querySelector('.nice-wrapper');
      this.imageUrl = cfg.link.getAttribute('href');
      this.popup = cfg.popup;
      this.imageWrapper = null;
      this.openedImageNumber = null;

      this.controls = new Controls({
         gallery: this,
         popup: cfg.popup,
         options: cfg.options
      });

      this.getOpenedImageNumber(cfg.link);
      this.createImage(this.imageUrl);
   }

   /**
    * Создадим картинку на подложке
    */
   createImage(imageUrl) {
      let container = document.createElement('div');
      container.className = 'nice-image-container';

      this.wrapper.appendChild(container);
      this.controls.addArrows();
      this.insertImage(container, imageUrl);
   }

   /**
    * Вставим в контейнер изображение нужной высоты
    */
   insertImage(container, src, fromRight) {
      let transformClassName = '';
      switch (fromRight) {
         case true:
            transformClassName = ' nice-animation-right-fadeIn';
            break;
         case false:
            transformClassName = ' nice-animation-left-fadeIn';
            break;
      }

      this.imageWrapper = document.createElement('div');
      this.imageWrapper.className = 'nice-image-wrapper';
      this.imageWrapper.innerHTML = `<img src="${src}" class="nice-image${transformClassName}">`;
      container.appendChild(this.imageWrapper);

      this.imageWrapper.addEventListener('click', (ev) => {
         if (ev.target.className.search('nice-image-wrapper') >= 0) {
            this.popup.close();
         }
      });
   }

   /**
    * Удалим картинку с анимацией
    */
   removeImage(toRight) {
      this.imageWrapper.className += ' oldWrapper';
      switch(toRight) {
         case true:
            document.querySelector('.nice-image').className = 'nice-image nice-animation-left-fadeOut';
            setTimeout(() => {
               this.deleteOldImages();
            }, 300);
            break;
         case false:
            document.querySelector('.nice-image').className = 'nice-image nice-animation-right-fadeOut';
            setTimeout(() => {
               this.deleteOldImages();
            }, 300);
            break;
         default:
            this.deleteOldImages();
      }
   }

   /**
    * Хак для удаления картинки – пользователь может очень быстро листать, в результате чего будут плодиться oldWrappers
    */
   deleteOldImages() {
      let oldWrappers = document.querySelectorAll('.oldWrapper');
      oldWrappers.forEach((item) => {
         item.remove();
      });
      document.querySelector('.nice-image').className = 'nice-image';
   }

   /**
    * Откроем следующую картинку
    */
   nextImage(iterator = 1, repeatImage = this.light_gallery[0], repeatImageNumber = 0, slideToRight = true) {
      let container = document.querySelector('.nice-image-container');

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