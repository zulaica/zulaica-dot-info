import CONTACT_INFO from './scripts/contact.js';
import applyPreferences from './scripts/preferences.js';
import fetchLatestImage, {
  applyLatestImage
} from './scripts/endpoints/instagram.js';
import latestSong, {
  renderLatestSong,
  startPolling,
  stopPolling
} from './scripts/endpoints/lastfm.js';

const handleLoad = async () => {
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
  await fetchLatestImage();
  await latestSong();
  applyLatestImage();
  applyPreferences();
  renderLatestSong();
  startPolling();
};

window.addEventListener('load', handleLoad, { passive: true, once: true });

window.addEventListener('unload', stopPolling, { passive: true, once: true });
