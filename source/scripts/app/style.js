import customProperties from './customProperties.js';
import { backgroundStyle } from './background.js';

const style = document.createElement('style');
style.append(`
  ${customProperties}
  ${backgroundStyle}
`);

export default style;
