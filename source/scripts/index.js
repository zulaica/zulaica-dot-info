import CONTACT_INFO from './contact.js';
import applyUserPreferences from './preferences.js';

const baseDomain = (hostname) => hostname.split('.').slice(-2).join('.');
const proxyURL =
  baseDomain(window.location.hostname) === 'zulaica.info'
    ? 'https://zulaica.dev'
    : 'http://localhost:3001';
const instagramEndpoint = new URL('/instagram', proxyURL);

const normalizeResponse = (response) => {
  const latestPost = response.data[0];
  return {
    // `thumbnail_url` is provided for video posts, `media_url` for image posts
    thumbnail: latestPost.thumbnail_url || latestPost.media_url
  };
};

const loadBackgroundImage = async () => {
  const image = document.createElement('img');
  const response = await fetch(instagramEndpoint);
  const responseBody = response.ok && (await response.json());
  const { thumbnail } = normalizeResponse(responseBody);

  return new Promise((resolve, reject) => {
    image.src = thumbnail;

    image.onload = () => {
      document.documentElement.style.setProperty(
        '--image-url',
        `url('${thumbnail}')`
      );
      resolve(thumbnail);
    };

    image.onerror = () => {
      document
        .getElementById('background-item')
        .style.setProperty('display', 'none');
      reject('⛔️ Error: Unable to load background image.');
    };
  });
};

window.addEventListener('load', () => {
  loadBackgroundImage();
  applyUserPreferences();
});

window.addEventListener('load', () => {
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
});
