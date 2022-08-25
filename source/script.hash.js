import CONTACT_INFO from './scripts/contact.js';
import applyPreferences from './scripts/preferences.js';
import latestImage from './scripts/endpoints/instagram.js';
import latestSong, { stopPolling } from './scripts/endpoints/lastfm.js';

const handleLoad = () => {
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
  latestImage();
  latestSong();
  applyPreferences();
};

window.addEventListener('load', handleLoad, { passive: true, once: true });

window.addEventListener('unload', stopPolling, { passive: true, once: true });
