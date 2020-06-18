import style from "./style.js";
import background, { context } from "./background.js";
import figure from "./figure.js";
import imgContainer from "./imgContainer.js";
import img from "./img.js";
import figcaption, {
  content,
  dateFormat,
  footer,
  localizedDateFormat,
  localizedTimeFormat,
  time,
  timeFormat,
  title
} from "./figcaption.js";

const section = document.querySelector("section");
const shadowRoot = section.attachShadow({ mode: "open" });

const scaffold = payload => {
  shadowRoot.append(style, background, figure);
  figure.append(imgContainer);
  imgContainer.append(img);
  figure.append(figcaption);
  figcaption.append(title, content, footer);
  footer.append(time);

  return new Promise((resolve, reject) => {
    img.src = payload.image;
    img.setAttribute("alt", payload.accessibility_caption);
    img.onload = () => {
      resolve(payload);
    };
    img.onerror = () => {
      reject("⛔️ Error: Unable to load image.");
    };
  });
};

const handleSuccess = payload => {
  const bg = new Image();
  bg.src = payload.image;
  bg.onload = () =>
    context.drawImage(bg, 0, 0, background.width, background.height);
  background.style.setProperty("--background-image", `url(${payload.image})`);

  title.textContent = "Instagram";
  content.innerHTML = `${payload.caption
    .replace(/(\n\n)/g, "</p><p>")
    .replace(/(\n)/g, "<br />")}`;
  time.setAttribute("datetime", `${payload.date.toISOString()}`);
  time.textContent = `${payload.date.toLocaleDateString(
    "en-US",
    localizedDateFormat
  )} at ${payload.date.toLocaleTimeString("en-US", localizedTimeFormat)}`;
};

const handleError = error => {
  const date = new Date();
  const isFirefox = navigator.userAgent.includes("Firefox");
  const fbContainerMessage =
    'This error may occur if you have the\
  <a href="https://addons.mozilla.org/en-US/firefox/addon/facebook-container/">\
  Mozilla Facebook Container Extension</a> enabled. The extension\
  prevents images loading from Instagram if this site is not allowed in\
  Facebook Container.';

  title.setAttribute("style", "font-style: normal");
  title.textContent = error;
  content.innerHTML = `${isFirefox && fbContainerMessage}`;
  time.setAttribute("datetime", `${date.toISOString()}`);
  time.textContent = `${date.toLocaleDateString(
    "en-US",
    dateFormat
  )} at ${date.toLocaleTimeString("en-US", timeFormat)}`;
};

const Meta = payload => {
  scaffold(payload)
    .then(() => handleSuccess(payload))
    .catch(error => handleError(error));
};

export default Meta;
