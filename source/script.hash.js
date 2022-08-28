import CONTACT_INFO from './scripts/contact.js';
import applyPreferences from './scripts/preferences.js';
import {
  applyLatestImage,
  fetchLatestImage
} from './scripts/endpoints/instagram.js';
import {
  fetchLatestTrack,
  renderLatestTrack,
  startPolling
} from './scripts/endpoints/lastfm.js';

const handleDomContentLoaded = async () => {
  await fetchLatestImage();
  await fetchLatestTrack();
};

const handleLoad = () => {
  applyLatestImage();
  renderLatestTrack();
  startPolling();
  applyPreferences();
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
};

window.addEventListener('DOMContentLoaded', handleDomContentLoaded, {
  passive: true,
  once: true
});
window.addEventListener('load', handleLoad, { passive: true, once: true });
