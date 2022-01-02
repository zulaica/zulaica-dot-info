const figcaption = document.createElement('figcaption');
export const title = document.createElement('h1');
export const content = document.createElement('p');
export const footer = document.createElement('footer');
export const time = document.createElement('time');

export const figcaptionStyle = `
  figcaption {
    width: 45vw;
    height: max-content;
    margin: auto 0;
    margin-right: calc(-1 * var(--border-radius));
    padding: var(--caption-padding);
    padding-right: calc(var(--caption-padding) + var(--border-radius));
    text-align: left;
    font-size: 1.125rem;
    color: var(--text-color);
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
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

  :host:not(.error) figcaption {
    border-right: transparent;
  }

  :host(.error) figcaption {
    margin: auto;
  }

  :host(.error) figcaption h1 {
    font-style: normal;
  }
`;

export default figcaption;
