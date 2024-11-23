import LastFM from "./scripts/apis/lastfm.js";
import CONTACT_INFO from "./scripts/contact.js";
import Poller from "./scripts/helpers/poller.js";
import initTheme from "./scripts/preferences.js";

const handleDomContentLoaded = async () => {
  console.info(`%c ${CONTACT_INFO}`, "font-family: monospace;");

  const loader = document.getElementById("loader");
  loader.style.display = "grid";

  LastFM.init();
  const poll = new Poller(210_000);
  poll.start(LastFM.update);

  initTheme();
  setTimeout(() => {
    document.getElementById("loader").classList.add("fade-out");
  }, 1500);
};

window.addEventListener("DOMContentLoaded", handleDomContentLoaded, {
  passive: true,
  once: true
});
