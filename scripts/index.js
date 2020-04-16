import CONTACT_INFO from "./contact.js";
import isSupported from "./support.js";
import Meta from "./Meta/index.js";
import parallax from "./Meta/parallax.js";

const instagramURL = "https://www.instagram.com/zulaica/?__a=1";

const validateResponse = (response) => {
  if (!response.ok) {
    throw new Error(
      `${response.statusText}` || "😞 An unknown error has occurred."
    );
  }

  return response.json();
};

const normalizeResponse = (response) => {
  const latestPost =
    response.graphql.user.edge_owner_to_timeline_media.edges[0].node;
  return {
    accessibility_caption:
      latestPost.accessibility_caption || "Accessibility caption not provided",
    caption:
      latestPost.edge_media_to_caption.edges[0] &&
      latestPost.edge_media_to_caption.edges[0].node.text,
    date: new Date(latestPost.taken_at_timestamp * 1000),
    image: latestPost.display_url,
  };
};

const handleSupported = () =>
  fetch(instagramURL)
    .then((response) => validateResponse(response))
    .then((response) => normalizeResponse(response))
    .then((payload) => Meta(payload))
    .catch((error) => console.info(error));

const handleUnsupported = () => console.info("handleUnsupported");

window.addEventListener("load", () => {
  isSupported ? handleSupported() : handleUnsupported();
});

window.addEventListener("DOMContentLoaded", () => {
  console.info(`%c ${CONTACT_INFO}`, "font-family: monospace;");
});

document.addEventListener("mousemove", parallax);
