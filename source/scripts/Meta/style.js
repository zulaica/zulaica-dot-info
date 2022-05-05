import customProperties from './customProperties.js';
import { backgroundStyle } from './background.js';
import { figureStyle } from './figure.js';
import { mediaContainerStyle } from './mediaContainer.js';
import { figcaptionStyle } from './figcaption.js';

const style = document.createElement('style');
style.append(`
  ${customProperties}
  ${backgroundStyle}
  ${figureStyle}
  ${mediaContainerStyle}
  ${figcaptionStyle}
`);

export default style;
