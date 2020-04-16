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

const handleSuccess = (payload) => {
  const bg = new Image();
  bg.src = payload.image;
  bg.onload = () =>
    context.drawImage(bg, 0, 0, background.width, background.height);

  background.style.setProperty("--background-image", `url(${payload.image})`);

  img.setAttribute("src", payload.image);
  img.setAttribute(
    "alt",
    `${payload.type} ${
      payload.verb
    } on ${payload.date.toDateString()} at ${payload.date.toTimeString()}`
  );

  figcaption.innerHTML = `<h1 style="
    margin: 0;
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
    font-style: italic;
    border-bottom: 1px solid var(--title-border-color);
  ">Instagram</h1><p>${payload.caption}</p>`;

  return Promise.resolve();
};

// const handleError = error => "😞 There was an error.";

const Meta = (payload) => {
  handleSuccess(payload).then(() => buildMeta());
};

export default Meta;
