import CONTACT_INFO from './contact.js';
import applyPreferences from './preferences.js';
import applyImage from './endpoints/instagram.js';
import applyLatestSong from './endpoints/lastfm.js';

window.addEventListener('load', () => {
  applyImage();
  applyLatestSong();
  applyPreferences();
});

window.addEventListener('load', () => {
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
});
