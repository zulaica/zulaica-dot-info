const imgContainer = document.createElement("div");

export const imgContainerStyle = `
  div {
    display: flex;
    align-items: center;
    justify-items: center;
    width: var(--image-size);
    height: var(--image-size);
    margin: auto;
    background: var(--image-container-color);
    border: 1px solid var(--image-container-color);
    border-radius: 3px;
    box-shadow: var(--shade);
  }

  div::after {
    content: "";
    position: absolute;
    width: var(--image-size);
    height: var(--image-size);
    border-radius: 2px;
    background: var(--photo-corner-color);
    -webkit-clip-path: polygon(var(--clip-path));
    clip-path: polygon(var(--clip-path));
  }
`;

export default imgContainer;
