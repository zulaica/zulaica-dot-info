const figure = document.createElement('figure');

export const figureStyle = `
  figure {
    margin: auto;
    width: 100vw;
    display: flex;
  }

  :host(.error) figure {
    --background-color: #9334;
    --border-color: #9339;
    --shade-color: var(--background-color);
  }
`;

export default figure;
