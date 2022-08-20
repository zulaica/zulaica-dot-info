import CONTACT_INFO from './scripts/contact.js';
import applyPreferences from './scripts/preferences.js';
import applyImage from './scripts/endpoints/instagram.js';
import applyLatestSong from './scripts/endpoints/lastfm.js';

window.addEventListener('load', () => {
  applyImage();
  applyLatestSong();
  applyPreferences();
});

window.addEventListener('load', () => {
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
});
