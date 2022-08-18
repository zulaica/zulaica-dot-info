import CONTACT_INFO from './contact.js';
import applyUserPreferences from './preferences.js';

const instagramURL = 'https://www.zulaica.dev/instagram';

const normalizeResponse = (response) => {
  const latestPost = response.data[0];
  return {
    // `thumbnail_url` is provided for video posts, `media_url` for image posts
    thumbnail: latestPost.thumbnail_url || latestPost.media_url
  };
};

const loadBackgroundImage = async () => {
  const image = document.createElement('img');
  const response = await fetch(instagramURL);
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
