import background from "./background.js";

const setOffset = (offsetX, offsetY) => {
  background.style.setProperty(
    "transform",
    `scale3d(1.25, 1.25, 1.25) translate3d(${offsetX}px, ${offsetY}px, 0)`
  );
};

const parallax = event => {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  const offsetX = -Math.floor((width / 2 - event.clientX) / 65);
  const offsetY = -Math.floor((height / 2 - event.clientY) / 65);
  requestAnimationFrame(() => setOffset(offsetX, offsetY));
};

export default parallax;
