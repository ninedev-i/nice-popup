'use strict';
import {Gallery} from './gallery';
import {Inline} from './inline';
import './app.less'

export class NicePopup {
   constructor(cfg) {
      // для ssr если нет window, то не обрабатываем
      if (!window) {
         return;
      }

      this.cfg = cfg;
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

      let background = document.createElement('div');
      background.className = 'nice-wrapper-background';

      document.body.appendChild(this.wrapper);
      this.wrapper.appendChild(background);
   }

   /**
    * Закрыть попап
    */
   close() {
      document.body.removeChild(this.wrapper);
   }
}

/**
 * для импорта через html запишем в глобальную переменную window
 */
// if (window) {
//    window.NicePopup = NicePopup;
// }
