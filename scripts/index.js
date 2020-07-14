import CONTACT_INFO from "./contact.js";
import isSupported from "./support.js";

const instagramURL = "https://zulaica.dev/instagram";

const normalizeResponse = response => {
  const latestPost = response.data[0];
  return {
    accessibility_caption:
      latestPost.accessibility_caption || "Accessibility caption not provided.",
    caption: latestPost.caption,
    date: new Date(latestPost.timestamp.replace(/\+0000/g, "Z")),
    image: latestPost.media_url
  };
};

const handleSupported = () =>
  fetch(instagramURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `⛔️ ${response.statusText}` || "😞 An unknown error has occurred."
        );
      }

      return response.json();
    })
    .then(response => normalizeResponse(response))
    .then(payload => {
      import("./Meta/index.js").then(module => module.default(payload));
      import("./Meta/parallax.js").then(module =>
        document.addEventListener("mousemove", module.default, {
          passive: true
        })
      );
    })
    .catch(error => {
      document.getElementById("message").append(`⛔️ ${error}`);
    });

const handleUnsupported = () => {
  document.getElementById("message").append("⚠️ Unsupported Browser");
  document
    .getElementById("context")
    .append(
      'Your browser does not support the features required to render this\
      site. Please consider <a href="https://browsehappy.com"> upgrading to a\
      modern browser</a>.'
    );
};

window.addEventListener("load", () => {
  isSupported ? handleSupported() : handleUnsupported();
});

window.addEventListener("load", () => {
  console.info(`%c ${CONTACT_INFO}`, "font-family: monospace;");
});
