'use strict';

export class Controls {
   constructor(cfg) {
      this.gallery = cfg.gallery;
      this.showArrows = cfg.showArrows;

      this.keyBoardListener();
   }

   /**
    * Отобразим стрелки переключения слайдов
    */
   addArrows() {
      if (!this.showArrows) {
         return;
      }
      let wrapper = document.querySelector('.light-image-container');

      let arrows = document.createElement('div');
      arrows.className = 'light-image-arrows';
      arrows.innerHTML = `<div class="light-image-arrows-left">left</div><div class="light-image-arrows-right">right</div>`;
      wrapper.appendChild(arrows);

      // Закроем по нажатии на подложку стрелок
      arrows.addEventListener('click', (ev) => {
         switch (ev.target.className) {
            case 'light-image-arrows-left':
               this.gallery.previousImage();
               break;
            case 'light-image-arrows-right':
               this.gallery.nextImage();
               break;
            default:
               this.gallery.close();
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
               this.gallery.previousImage();
               break;
            case 39:
               this.gallery.nextImage();
               break;
            case 27:
               this.gallery.close();
               break;
         }
      }
   }
}