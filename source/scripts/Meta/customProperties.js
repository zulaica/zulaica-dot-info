const customProperties = `
  :host {
    --shade-color: var(--background-color);
    --title-border-color: var(--border-color);
    --border-radius: 2px;
    --caption-padding: 2.5rem;
    --clip-path: 0px 0px, 0px 100%, 100% 100%, 100% 0px, 0px 0px, 2.5% 2.5%,
      5% 1px, 95% 1px, calc(var(--media-size) - 1px) 5%,
      calc(var(--media-size) - 1px) 95%, 95% calc(var(--media-size) - 1px),
      5% calc(var(--media-size) - 1px), 1px 95%, 1px 5%, 2.5% 2.5%;
    --media-container-color: #000;
    --media-size: 33vw;
    --photo-corner-color: #fff;
    --shade: 0 0 0 2px var(--shade-color);
  }

  :host(.error) {
    --background-color: #9334;
    --border-color: #9339;
    --shade-color: var(--background-color);
  }
`;

export default customProperties;
