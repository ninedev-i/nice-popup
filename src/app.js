'use strict';
import {Gallery} from './gallery';
import {Inline} from './inline';

export class NicePopup {
   constructor(cfg) {
      // для ssr если нет window, то не обрабатываем
      if (!window) {
         return;
      }
      this.overlayColor = cfg.overlayColor === undefined ? '#0f0f11' : cfg.overlayColor;

      this.cfg = cfg || {};
      this.wrapper = null;

      document.addEventListener('click', this.openPopup.bind(this));
   }

   /**
    * Открытие элемента
    */
   openPopup(ev) {
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
      ev.preventDefault();
   }

   /**
    * Добавим подложку
    */
   addWrapper() {
      this.wrapper = document.createElement('div');
      this.wrapper.className = 'nice-wrapper';
      this.wrapper.innerHTML = `<div class="nice-wrapper-background" style="background-color: ${this.overlayColor};"></div>`;

      document.body.appendChild(this.wrapper);
   }

   /**
    * Закрыть попап
    */
   close() {
      document.body.removeChild(this.wrapper);
   }
}

export function init(cfg) {
   new NicePopup(cfg);
}
