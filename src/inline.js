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
   createContainer(imageUrl) {
      let container = document.createElement('div');
      let hiddenContent = document.querySelector(this.link.getAttribute('href')).innerHTML;
      container.className = 'nice-box-container';
      container.innerHTML = `<div class="nice-box">${hiddenContent}</div>`;

      container.addEventListener('click', (ev) => {
         if (ev.target.className === 'nice-box-container') {
            this.popup.close();
         }
      });

      this.wrapper.appendChild(container);
   }
}