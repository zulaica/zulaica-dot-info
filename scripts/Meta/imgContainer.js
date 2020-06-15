const imgContainer = document.createElement("div");

export const imgContainerStyle = `
  div {
    display: flex;
    align-items: center;
    justify-items: center;
    width: 33vw;
    height: 33vw;
    margin: auto;
    background: var(--img-container-color);
    border: 1px solid var(--img-container-color);
    border-radius: 3px;
    box-shadow: var(--shade);
  }

  div::after {
    content: "";
    position: absolute;
    width: 33vw;
    height: 33vw;
    border-radius: 2px;
    background: var(--photo-corner-color);
    -webkit-clip-path: polygon(var(--clip-path));
    clip-path: polygon(var(--clip-path));
  }
`;

export default imgContainer;
