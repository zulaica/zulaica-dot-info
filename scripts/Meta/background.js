const background = document.createElement("canvas");
background.setAttribute("id", "background");
background.setAttribute("role", "presentation");
background.setAttribute("aria-hidden", "true");

export const context = background.getContext("2d", { alpha: true });
const canvasBlurSupported = context && context.filter;

if (canvasBlurSupported) {
  context.filter = "blur(10px)";
}

const cssBlur = `
  background: var(--background-image);
  background-position: center;
  background-size: cover;
  filter: blur(50px);
`;

export const backgroundStyle = `
  #background {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -10;
    transform: scale3d(1.25, 1.25, 1.25) translate3d(0, 0, 0);
    ${canvasBlurSupported ? "" : cssBlur}
  }
`;

export default background;
