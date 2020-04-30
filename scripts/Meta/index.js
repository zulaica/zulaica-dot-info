import style from "./style.js";
import background, { context } from "./background.js";
import figure from "./figure.js";
import imgContainer from "./imgContainer.js";
import img from "./img.js";
import figcaption from "./figcaption.js";

const section = document.querySelector("section");
const shadowRoot = section.attachShadow({ mode: "open" });

const buildMeta = () => {
  shadowRoot.appendChild(style);
  shadowRoot.appendChild(background);
  shadowRoot.appendChild(figure);
  figure.appendChild(imgContainer);
  imgContainer.appendChild(img);
  figure.appendChild(figcaption);
};

const handleSuccess = payload => {
  const bg = new Image();
  bg.src = payload.image;
  bg.onload = () =>
    context.drawImage(bg, 0, 0, background.width, background.height);

  background.style.setProperty("--background-image", `url(${payload.image})`);

  img.setAttribute("src", payload.image);
  img.setAttribute("alt", payload.accessibility_caption);

  figcaption.innerHTML = `<h1>Instagram</h1>
  <p>${payload.caption.replace(/(\n\n)/g, "</p><p>")}</p>
  <footer>
    <time datetime="${payload.date.toISOString()}">
      ${payload.date.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      })} at ${payload.date.toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit"
  })}
    </time>
  </footer>`;

  return Promise.resolve();
};

const Meta = payload => {
  handleSuccess(payload).then(() => buildMeta());
};

export default Meta;
