import style from "./style.js";
import background, { context } from "./background.js";
import figure from "./figure.js";
import imgContainer from "./imgContainer.js";
import img from "./img.js";
import figcaption from "./figcaption.js";

const section = document.querySelector("section");
const shadowRoot = section.attachShadow({ mode: "open" });

const scaffold = payload => {
  shadowRoot.appendChild(style);
  shadowRoot.appendChild(background);
  shadowRoot.appendChild(figure);
  figure.appendChild(imgContainer);
  imgContainer.appendChild(img);
  figure.appendChild(figcaption);

  img.src = payload.image;

  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(payload);
    };

    img.onerror = () => {
      reject("⛔️ Error: Unable to load or display image.");
    };
  });
};

const handleSuccess = payload => {
  const bg = new Image();
  bg.src = payload.image;
  bg.onload = () =>
    context.drawImage(bg, 0, 0, background.width, background.height);

  background.style.setProperty("--background-image", `url(${payload.image})`);

  img.setAttribute("alt", payload.accessibility_caption);

  figcaption.innerHTML = `<h1>Instagram</h1>
  <p>${payload.caption
    .replace(/(\n\n)/g, "</p><p>")
    .replace(/(\n)/g, "<br />")}</p>
  <footer>
    <time datetime="${payload.date.toISOString()}">${payload.date.toLocaleDateString(
    "en-US",
    {
      timeZone: "America/Los_Angeles",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  )} at ${payload.date.toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit"
  })}</time>
  </footer>`;

  return Promise.resolve();
};

const handleError = error => {
  const date = new Date();
  const isFirefox = navigator.userAgent.includes("Firefox");
  const noImage = error === "Error: Unable to render image.";
  const fbContainerMessage =
    'This error may occur if you have the\
  <a href="https://addons.mozilla.org/en-US/firefox/addon/facebook-container/">\
  Mozilla Facebook Container Extension</a> enabled. The extension\
  prevents images loading from Instagram if this site is not allowed in\
  Facebook Container.';
  figcaption.innerHTML = `<h1>${error}</h1>
  <p>${isFirefox && noImage ? fbContainerMessage : ""}</p>
  <footer>
    <time datetime="${date.toISOString()}">${date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })} at ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  })}</time>
  </footer>`;
};

const Meta = payload => {
  scaffold(payload)
    .then(() => handleSuccess(payload))
    .catch(error => handleError(error));
};

export default Meta;
