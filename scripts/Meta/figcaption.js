const figcaption = document.createElement('figcaption');

export const figcaptionStyle = `
  figcaption {
    width: 45vw;
    height: max-content;
    margin: auto 0;
    padding: 2.5rem;
    text-align: left;
    font-size: 1.25rem;
    line-height: 1.5;
    color: var(--text-color);
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-right: transparent;
    border-radius: 3px;
    box-shadow: var(--shade);
  }
`;

export default figcaption;
