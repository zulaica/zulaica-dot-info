import { backgroundStyle } from './background.js';
import { figureStyle } from './figure.js';
import { imgContainerStyle } from './imgContainer.js';
import { imgStyle } from './img.js';
import { figcaptionStyle } from './figcaption.js';

const style = document.createElement('style');
style.textContent = `
  ${backgroundStyle}
  ${figureStyle}
  ${imgContainerStyle}
  ${imgStyle}
  ${figcaptionStyle}
`;

export default style;
