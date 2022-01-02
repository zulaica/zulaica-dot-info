export const backgroundStyle = `
:host::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  filter: blur(50px);
  margin: -100px;
  background-image: var(--image-url);
  background-position: center;
  background-size: cover;
  transform: translate(var(--offset-x), var(--offset-y));
}
`;

export const updateBackgroundOffset = (event) => {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  const offsetX = -(Math.floor(width / 2 - event.clientX) / 50);
  const offsetY = -(Math.floor(height / 2 - event.clientY) / 50);
  document.documentElement.style.setProperty('--offset-x', `${offsetX}px`);
  document.documentElement.style.setProperty('--offset-y', `${offsetY}px`);
};
