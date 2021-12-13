import { backgroundStyle } from './background.js';
import { figureStyle } from './figure.js';
import { mediaContainerStyle } from './mediaContainer.js';
import { imgStyle } from './img.js';
import { figcaptionStyle } from './figcaption.js';

const style = document.createElement('style');
style.append(`
  ${backgroundStyle}
  ${figureStyle}
  ${mediaContainerStyle}
  ${imgStyle}
  ${figcaptionStyle}
`);

export default style;
