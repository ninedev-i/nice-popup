# Nice PopUp

Customizable script for displaying images or inline content.

**N.B. This is a beta version!**
## Install

``` bash
npm install nice-popup
```


## Usage
1. Html – gallery
```html
<a data-nice="gallery" href="pic1.jpg">
   <img src="pic1.jpg">
</a>
<a data-nice="gallery" href="pic2.jpg">
   <img src="pic2.jpg">
</a>
```

2. Html – Inline content
```html
<a data-nice="inline" href="#hiddenContent">Open inline content</a>
<div id="hiddenContent" style="display: none;">Скрытый контент</div>
```

3. Javascript
```javascript
import {NicePopup} from 'nice-popup';

new NicePopup({
    showArrows: true,
    mouseAdditionalButtons: true,
    keyboard: true
});
```

## Options

| Props                   | Type    | Default | Description |
|:------------------------|:--------|:--------|:-----------------------|
| showArrows              | Boolean | true    | Show right and left arrow |
| keyboard                | Boolean | true    | Allow to control by keyboard arrow keys and escape |
| mouseAdditionalButtons  | Boolean | true    | Allow to control by mouse additional buttons |