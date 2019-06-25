'use strict';

import {Controls} from "./controls";

export class Inline {
   constructor(cfg) {
      this.wrapper = document.querySelector('.nice-wrapper');
      this.popup = cfg.popup;
      this.link = cfg.link;

      new Controls({
         instance: cfg.instance,
         popup: cfg.popup,
         options: cfg.options
      });

      this.createContainer();
   }

   /**
    * Создадим блок-контейнер
    */
   createContainer() {
      let container = document.createElement('div');
      let hiddenBlock = document.querySelector(this.link.getAttribute('href'));
      hiddenBlock.className += ' nice-box-container';

      let hiddenBox = hiddenBlock.firstElementChild;
      hiddenBox.className += ' nice-box';

      let closeButton = document.createElement('div');
      closeButton.className = 'nice-box-closeButton';
      closeButton.innerText = '×';
      hiddenBox.appendChild(closeButton, hiddenBox);

      document.querySelector('.nice-box-closeButton').addEventListener('click', () => {
         this.popup.close();
      });

      document.querySelector('.nice-box-container').addEventListener('click', (ev) => {
         if (ev.target.className.search('nice-box-container') >= 0) {
            this.popup.close();
         }
      });

      this.wrapper.appendChild(container);
   }
}