export const backgroundStyle = `
:host::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  filter: blur(50px);
  margin: -100px;
  background-image: var(--image-url);
  background-position: center;
  background-size: cover;
}
`;
