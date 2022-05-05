const customProperties = `
  :host {
    --shade-color: var(--background-color);
    --shade: 0 0 0 2px var(--shade-color);
  }

  :host(.error) {
    --background-color: #9334;
    --border-color: #9339;
    --shade-color: var(--background-color);
  }
`;

export default customProperties;
