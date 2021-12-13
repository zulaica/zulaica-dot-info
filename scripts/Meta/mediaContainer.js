const mediaContainer = document.createElement('div');

export const mediaContainerStyle = `
  div {
    display: flex;
    align-content: center;
    justify-content: center;
    width: var(--media-size);
    height: var(--media-size);
    margin: auto;
    background: var(--media-container-color);
    border: 1px solid var(--media-container-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shade);
    overflow: hidden;
  }

  @supports (clip-path: polygon(0% 0%)){
    div::after {
      content: "";
      position: absolute;
      width: var(--media-size);
      height: var(--media-size);
      border-radius: var(--border-radius);
      background: var(--photo-corner-color);
      clip-path: polygon(var(--clip-path));
    }
  }
`;

export default mediaContainer;
