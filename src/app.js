'use strict';
import {Gallery} from './gallery';
import {Inline} from './inline';
import './app.less';

export class NicePopup {
   constructor({showArrows = true, arrowsPosition = 'top', overlayColor = '#0f0f11', mouseAdditionalButtons = true, keyboard = true, draggable = true} = {}) {
      // для ssr если нет window, то не обрабатываем
      if (!window) {
         return;
      }
      this.cfg = {
         showArrows: showArrows,
         arrowsPosition: arrowsPosition,
         keyboard: keyboard,
         mouseAdditionalButtons: mouseAdditionalButtons,
         overlayColor: overlayColor,
         draggable: draggable
      };
      this.wrapper = null;

      const inlineLinks= document.querySelectorAll('[data-nice="inline"]');
      Array.from(inlineLinks).forEach(element => {
         element.addEventListener('click', this.openPopup.bind(this, 'inline'));
      });
      const galleryLinks= document.querySelectorAll('[data-nice="gallery"]');
      Array.from(galleryLinks).forEach(element => {
         element.addEventListener('click', this.openPopup.bind(this, 'gallery'));
      });
   }

   /**
    * Открытие элемента
    */
   openPopup(linkType, ev) {
      let target = ev.target;

      // Проверим нет ли уже бэкграундов (нужно для SPA) или не является ли ссылка тегом a
      if (target.tagName === 'A' || target.parentNode.tagName === 'A') {
         ev.preventDefault();
      }
      if (document.querySelector('.nice-wrapper')) {
         return;
      }

      let link = target && target.hasAttribute('data-nice') && target.getAttribute('data-nice');
      if (!link) {
         target = ev.target.parentElement;
      }
      let config = {
         popup: this,
         link: target,
         options: this.cfg
      };

      switch(linkType) {
         case 'gallery':
            this.addWrapper();
            new Gallery(config);
            break;
         case 'inline':
            this.addWrapper(target);
            new Inline(config);
            break;
      }
   }

   /**
    * Добавим подложку
    */
   addWrapper(clickTarget) {
      this.wrapper = document.createElement('div');
      this.wrapper.className = 'nice-wrapper';
      this.wrapper.innerHTML = `<div class="nice-wrapper-background" style="background-color: ${this.cfg.overlayColor};"></div>`;
      document.body.style.overflow = 'hidden';

      if (clickTarget) {
         clickTarget.parentNode.insertBefore(this.wrapper, clickTarget);
      } else {
         document.body.appendChild(this.wrapper);
      }
   }

   /**
    * Закрыть попап
    */
   close() {
      this.wrapper.remove();
      document.body.style.overflow = 'auto';

      let boxContainer = document.querySelector('.nice-box-container');
      if (boxContainer) {
         let box = document.querySelector('.nice-box');
         box.className = box.className.slice(0, -9);

         boxContainer.className = boxContainer.className.slice(0, -19);

         document.querySelector('.nice-box-closeButton').remove();
      }
   }
}

export function init(cfg) {
   if (!window) {
      return;
   }
   new NicePopup(cfg);
}