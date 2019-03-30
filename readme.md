# Nice PopUp

Customizable script for displaying images or inline content.

**N.B. This is a beta version!**
## Install
1. Install package by command ```npm install nice-popup``` or ```yarn add nice-popup```
2. Add styles to your project from [here](https://github.com/FallenMaster/nice-popup/blob/master/dist/app.css).

## Usage
```javascript
import {NicePopup} from 'nice-popup';

new NicePopup({
    showArrows: true,
    mouseAdditionalButtons: true,
    keyboard: true
});
```

## Examples
##### 1. Gallery.

Just add **data-nice="gallery"** attribute to your links.
```html
<a data-nice="gallery" href="pic1.jpg">
   <img src="pic1.jpg">
</a>
<a data-nice="gallery" href="pic2.jpg">
   <img src="pic2.jpg">
</a>
```

##### 2. Inline content.

Add **data-nice="inline"** to your link and set href attribute.
```html
<a data-nice="inline" href="#hiddenContent">Open inline content</a>
<div id="hiddenContent" style="display: none;">Hidden text</div>
```

## Options

| Props                   | Type    | Default | Description |
|:------------------------|:--------|:--------|:-----------------------|
| overlayColor            | String  |'#0f0f11'| Set overlay color |
| showArrows              | Boolean | true    | Show right and left arrow |
| arrowsPosition          | String  | 'top'   | Set arrows position: top or side |
| keyboard                | Boolean | true    | Allow to control by keyboard arrow keys and escape |
| mouseAdditionalButtons  | Boolean | true    | Allow to control by mouse additional buttons |