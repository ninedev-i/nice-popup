'use strict';
import {Gallery} from './gallery';
import {Inline} from './inline';
import './app.css';

export class NicePopup {
   constructor({showArrows = true, arrowsPosition = 'top', overlayColor = '#0f0f11', mouseAdditionalButtons = true, keyboard = true} = {}) {
      // для ssr если нет window, то не обрабатываем
      if (!window) {
         return;
      }
      this.cfg = {
         showArrows: showArrows,
         arrowsPosition: arrowsPosition,
         keyboard: keyboard,
         mouseAdditionalButtons: mouseAdditionalButtons,
         overlayColor: overlayColor
      };
      this.wrapper = null;

      document.addEventListener('click', this.openPopup.bind(this));
   }

   /**
    * Открытие элемента
    */
   openPopup(ev) {
      ev.preventDefault();
      // Проверим нет ли уже бэкграундов (нужно для SPA)
      if (document.querySelector('.nice-wrapper')) {
         return;
      }

      let target = ev.target;
      let link = target && target.hasAttribute('data-nice') && target.getAttribute('data-nice');
      if (!link) {
         target = ev.target.parentElement;
         link = target && target.hasAttribute('data-nice') && target.getAttribute('data-nice');
      }
      let config = {
         popup: this,
         link: target,
         options: this.cfg
      };

      switch(link) {
         case 'gallery':
            this.addWrapper();
            new Gallery(config);
            break;
         case 'inline':
            this.addWrapper();
            new Inline(config);
            break;
         default:
            return;
      }
   }

   /**
    * Добавим подложку
    */
   addWrapper() {
      this.wrapper = document.createElement('div');
      this.wrapper.className = 'nice-wrapper';
      this.wrapper.innerHTML = `<div class="nice-wrapper-background" style="background-color: ${this.cfg.overlayColor};"></div>`;
      document.body.style.overflow = 'hidden';

      document.body.appendChild(this.wrapper);
   }

   /**
    * Закрыть попап
    */
   close() {
      document.body.removeChild(this.wrapper);
      document.body.style.overflow = 'auto';
   }
}

export function init(cfg) {
   if (!window) {
      return;
   }
   new NicePopup(cfg);
}