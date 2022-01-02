export const backgroundStyle = `
:host::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: var(--image-url);
  background-position: center;
  transform: scale(1.25, 1.25);
  filter: blur(50px);
}
`;
