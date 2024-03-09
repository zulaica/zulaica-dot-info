import CONTACT_INFO from './scripts/contact.js';
import LastFM from './scripts/apis/lastfm.js';
import Poller from './scripts/helpers/poller.js';

const handleDomContentLoaded = async () => {
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
  const poll = new Poller(210_000);

  await LastFM.render();
  poll.start(LastFM.update);
};

window.addEventListener('DOMContentLoaded', handleDomContentLoaded, {
  passive: true,
  once: true
});
