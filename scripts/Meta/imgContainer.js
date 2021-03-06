const imgContainer = document.createElement("div");

export const imgContainerStyle = `
  div {
    display: flex;
    align-content: center;
    justify-content: center;
    width: var(--image-size);
    height: var(--image-size);
    margin: auto;
    background: var(--image-container-color);
    border: 1px solid var(--image-container-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shade);
    overflow: hidden;
  }

  @supports (clip-path: polygon(0% 0%)){
    div::after {
      content: "";
      position: absolute;
      width: var(--image-size);
      height: var(--image-size);
      border-radius: var(--border-radius);
      background: var(--photo-corner-color);
      clip-path: polygon(var(--clip-path));
    }
  }
`;

export default imgContainer;
