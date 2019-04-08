'use strict';

export class Controls {
   constructor(cfg) {
      this.popup = cfg.popup;
      this.gallery = cfg.gallery;
      this.moreThanOneImage = cfg.gallery ? cfg.gallery.light_gallery.length > 1 : false;
      this.options = cfg.options;

      if (this.options.mouseAdditionalButtons) {
         this.addMouseListener();
      }
      if (this.options.keyboard) {
         this.keyBoardListener();
      }
   }

   /**
    * Отобразим стрелки переключения слайдов
    */
   addArrows() {
      if (!this.options.showArrows || !this.moreThanOneImage) {
         return;
      }
      let wrapper = document.querySelector('.nice-image-container');

      let arrows = document.createElement('div');
      arrows.className = `nice-image-arrows nice-image-arrows-${this.options.arrowsPosition}`;
      arrows.innerHTML = `<div class="nice-image-arrows-left"></div><div class="nice-image-arrows-right"></div>`;
      wrapper.appendChild(arrows);

      // Закроем по нажатии на подложку стрелок
      arrows.addEventListener('click', (ev) => {
         switch (ev.target.className) {
            case 'nice-image-arrows-left':
               this.gallery.previousImage();
               break;
            case 'nice-image-arrows-right':
               this.gallery.nextImage();
               break;
            default:
               this.popup.close();
         }
      });
   }

   /**
    * Переключим слайды по нажатию клавиатуры
    */
   keyBoardListener() {
      window.onkeydown = (ev) => {
         let key = ev.keyCode ? ev.keyCode : ev.which;

         switch (key) {
            case 37:
               if (this.moreThanOneImage) {
                  this.gallery.previousImage();
               }
               break;
            case 39:
               if (this.moreThanOneImage) {
                  this.gallery.nextImage();
               }
               break;
            case 27:
               this.popup.close();
               break;
         }
      };
   }

   /**
    * Переключим слайды по нажатию на кнопки мыши
    */
   addMouseListener() {
      document.querySelector('.nice-wrapper').addEventListener('mouseup', (ev) => {
         ev.preventDefault(false);
         let key = ev.keyCode ? ev.keyCode : ev.which;
         switch (key) {
            case 4:
               if (this.moreThanOneImage) {
                  this.gallery.previousImage();
               } else {
                  this.popup.close();
               }
               break;
            case 5:
               if (this.moreThanOneImage) {
                  this.gallery.nextImage();
               }
               break;
         }
      });
   }
}