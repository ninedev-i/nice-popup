'use strict';

export class Controls {
   constructor(cfg) {
      this.popup = cfg.popup;
      this.gallery = cfg.gallery;
      this.moreThanOneImage = cfg.gallery ? cfg.gallery.light_gallery.length > 1 : false;
      this.options = cfg.options;
      this.isMouseMoving = false;

      if (this.options.mouseAdditionalButtons) {
         this.addMouseListener();
      }
      if (this.options.keyboard) {
         this.keyBoardListener();
      }

      if (this.options.draggable && this.moreThanOneImage) {
         document.querySelector('.nice-wrapper').className += ' nice-draggable';
         this.makeDraggable();
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
         let key = ev.keyCode ? ev.keyCode : ev.which;
         switch (key) {
            case 4:
               ev.preventDefault(false);
               if (this.moreThanOneImage) {
                  this.gallery.previousImage();
               } else {
                  this.popup.close();
               }
               break;
            case 5:
               ev.preventDefault(false);
               if (this.moreThanOneImage) {
                  this.gallery.nextImage();
               }
               break;
         }
      });
   }

   /**
    * Добавим возможность листать слайды свайпом
    */
   makeDraggable() {
      let dragImage = (ev) => {
         if (ev.target.className !== 'nice-image') {
            return;
         }

         let getCoords = (elem) => {
            let box = elem.getBoundingClientRect();
            return {
               top: box.top + pageYOffset,
               left: box.left + pageXOffset
            };
         };

         let draggedImage = document.querySelector('.nice-image');
         let imageClickPosition = ev.pageX - getCoords(draggedImage).left;
         let wrapper = document.querySelector('.nice-image-wrapper');

         document.onmousemove = (ev) => {
            wrapper.style.textAlign = 'left';

            let newPosition = ev.pageX - imageClickPosition;
            draggedImage.style.left = newPosition + 'px';
         };

         document.onmouseup = () => {
            if (this.isMouseMoving) {
               if (draggedImage.x + draggedImage.width / 2 > wrapper.offsetWidth / 2) {
                  this.gallery.previousImage();
               } else if (draggedImage.x + draggedImage.width / 2 < wrapper.offsetWidth / 2) {
                  this.gallery.nextImage();
               }
            }
            document.onmousemove = document.onmouseup = null;
            this.isMouseMoving = false;
         };
         draggedImage.ondragstart = () => {
            return false;
         };
      };

      document.addEventListener('mousedown', (ev) => {
         this.isMouseMoving = false;
         dragImage(ev);
      }, false);
      document.addEventListener('touchstart', dragImage, false);
      document.addEventListener('mousemove', () => {
         this.isMouseMoving = true;
      }, false);
   }
}
