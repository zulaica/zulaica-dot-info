import CONTACT_INFO from './scripts/contact.js';
import applyPreferences from './scripts/preferences.js';
import {
  fetchLatestTrack,
  renderLatestTrack,
  updateLatestTrack
} from './scripts/endpoints/lastfm.js';
import Poller from './scripts/helpers/poller.js';

const handleDomContentLoaded = async () => {
  await fetchLatestTrack();
};

const handleLoad = () => {
  renderLatestTrack();
  applyPreferences();

  const poll = new Poller(210_000);
  poll.start(updateLatestTrack);

  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
};

window.addEventListener('DOMContentLoaded', handleDomContentLoaded, {
  passive: true,
  once: true
});
window.addEventListener('load', handleLoad, { passive: true, once: true });
