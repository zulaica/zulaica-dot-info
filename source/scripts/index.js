import { startSpinner, stopSpinner } from './spinner.js';
import CONTACT_INFO from './contact.js';
import isSupported from './support.js';

const instagramURL = 'https://www.zulaica.dev/instagram';

const normalizeResponse = (response) => {
  const latestPost = response.data[0];
  return {
    // `thumbnail_url` is provided for video posts, `media_url` for image posts
    thumbnail: latestPost.thumbnail_url || latestPost.media_url
  };
};

const handleSupported = async () => {
  startSpinner();

  try {
    const response = await fetch(instagramURL);
    const responseBody = response.ok && (await response.json());
    const { default: Meta } = await import('./Meta/index.js');

    await Meta(normalizeResponse(responseBody));
  } catch (error) {
    document.getElementById('message').textContent = `⛔️ ${error.name}`;
    document.getElementById('context').textContent = `${error.message}`;
  }

  stopSpinner();
};

const handleUnsupported = () => {
  document.getElementById('message').textContent = '⚠️ Unsupported Browser';
  document.getElementById('context').innerHTML =
    'Your browser does not support the features required to render this\
      site. Please consider <a href="https://browsehappy.com">upgrading to a\
      modern browser</a>.';
};

window.addEventListener('load', () => {
  isSupported ? handleSupported() : handleUnsupported();
});

window.addEventListener('load', () => {
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
});
