'use strict';
import {Gallery} from './gallery';
import './app.less'

export class NicePopup {
   constructor(cfg) {
      this.cfg = cfg;
      this.wrapper = null;

      document.addEventListener('click', this.openPopup.bind(this));
   }

   /**
    * Открытие элемента
    */
   openPopup(ev) {
      let link = ev.target.parentElement;

      if (!link || !link.hasAttribute('data-nice')) {
         return;
      }
      ev.preventDefault();

      this.addWrapper();
      this.gallery = new Gallery({
         popup: this,
         link: link,
         options: this.cfg
      });
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
 * для ssr если нет window, то не обрабатываем
 * для импорта через html запишем в глобальную переменную window
 */
if (window) {
   window.NicePopup = NicePopup;
} else {
   return;
}
