export const backgroundStyle = `
:host {
  --background-filter: contrast(.75) blur(50px);
}

:host::before,
:host::after {
  content: '';
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

:host::before {
  background-image: var(--image-url);
  background-position: center;
  background-size: cover;
}

:host::after {
  background-color: var(--background-color);
}

@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  :host::before {
    background-size: 125%;
  }

  :host::after {
    -webkit-backdrop-filter: var(--background-filter);
    backdrop-filter: var(--background-filter);
  }
}

@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  :host::before {
    filter: var(--background-filter);
    transform: scale(1.25);
  }
}
`;
