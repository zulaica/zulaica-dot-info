import CONTACT_INFO from './scripts/contact.js';
import applyPreferences from './scripts/preferences.js';
import applyImage from './scripts/endpoints/instagram.js';
import applyLatestSong, {
  startPolling,
  stopPolling
} from './scripts/endpoints/lastfm.js';

window.addEventListener('load', () => {
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
  applyImage();
  applyLatestSong();
  applyPreferences();
  startPolling();
});

window.addEventListener('unload', () => {
  stopPolling();
});
