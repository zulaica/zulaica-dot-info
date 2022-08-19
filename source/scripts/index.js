import CONTACT_INFO from './contact.js';
import applyUserPreferences from './preferences.js';
import applyImage from './endpoints/instagram.js';

window.addEventListener('load', () => {
  applyImage();
  applyUserPreferences();
});

window.addEventListener('load', () => {
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
});
