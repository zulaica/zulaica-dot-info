const figcaption = document.createElement("figcaption");

export const figcaptionStyle = `
  figcaption {
    width: 45vw;
    height: max-content;
    margin: auto 0;
    padding: 2.5rem;
    text-align: left;
    font-size: 1.125rem;
    line-height: 1.5;
    color: var(--text-color);
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-right: transparent;
    border-radius: 3px;
    box-shadow: var(--shade);
  }

  figcaption h1 {
    margin: -0.625rem 0 0 0;
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: bold;
    font-size: 1.75rem;
    font-style: italic;
    border-bottom: 1px solid var(--title-border-color);
  }

  figcaption p {
    margin: 1rem 0 0 0;
    white-space: pre-line;
  }

  figcaption footer {
    margin-top: 1rem;
    font-size: 0.8125rem;
    text-align: right;
  }
`;

export default figcaption;
