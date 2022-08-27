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

const handleDomContentLoaded = async () => {
  await fetchLatestImage();
  await latestSong();
  startPolling();
};

const handleLoad = () => {
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
  applyLatestImage();
  renderLatestSong();
  applyPreferences();
};

window.addEventListener('DOMContentLoaded', handleDomContentLoaded, {
  passive: true,
  once: true
});
window.addEventListener('load', handleLoad, { passive: true, once: true });
window.addEventListener('unload', stopPolling, { passive: true, once: true });
