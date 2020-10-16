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

const handleSupported = async () => {
  try {
    const response = await fetch(instagramURL);
    const responseBody = response.ok ? await response.json() : undefined;
    const Meta = await import("./Meta/index.js");
    const Parallax = await import("./Meta/parallax.js");
    const data = normalizeResponse(responseBody);

    Meta.default(data);
    document.addEventListener("mousemove", Parallax.default, { passive: true });
  } catch (error) {
    document.getElementById("message").textContent = `⛔️ ${error.message}`;
  }
};

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
