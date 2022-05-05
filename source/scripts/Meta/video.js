const media = document.createElement('video');
media.autoplay = true;
media.loop = true;
media.muted = true;

export const mediaStyle = `
  video {
    object-fit: contain;
    width: 100%;
    text-align: center;
    border-radius: var(--border-radius);
  }
`;

export default media;
