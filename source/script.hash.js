import LastFM from "./scripts/apis/lastfm.js";
import CONTACT_INFO from "./scripts/contact.js";
import Poller from "./scripts/helpers/poller.js";
import Loader from "./scripts/loader.js";
import Preferences from "./scripts/preferences.js";

const lastFMPoller = new Poller(210_000);

const handleDomContentLoaded = async () => {
  console.info(`%c ${CONTACT_INFO}`, "font-family: monospace;");
  Loader.start();
  Preferences.init();
  await LastFM.init();
  lastFMPoller.start(LastFM.update);
};

window.addEventListener("DOMContentLoaded", handleDomContentLoaded, {
  passive: true,
  once: true,
});

window.addEventListener("LastFMInitCompleted", Loader.stop, {
  passive: true,
  once: true,
});

window.addEventListener("LastFMMaxRetries", lastFMPoller.stop, {
  passive: true,
  once: true,
});
