import { startSpinner, stopSpinner } from './spinner.js';
import CONTACT_INFO from './contact.js';
import isSupported from './support.js';

const instagramURL = 'https://www.zulaica.dev/instagram';

const normalizeResponse = (response) => {
  const latestPost = response.data[0];
  return {
    accessibility_caption:
      latestPost.accessibility_caption ||
      'Accessibility caption was not provided.',
    caption: latestPost.caption,
    date: new Date(latestPost.timestamp.replace(/\+0000/g, 'Z')),
    media: latestPost.media_url,
    media_type: latestPost.media_type,
    // `thumbnail_url` is only made available for video content
    thumbnail: latestPost.thumbnail_url || null
  };
};

const handleSupported = async () => {
  startSpinner();

  try {
    const response = await fetch(instagramURL);
    const responseBody = response.ok && (await response.json());
    const Meta = await import('./Meta/index.js');
    Meta.default(normalizeResponse(responseBody), stopSpinner);
  } catch (error) {
    stopSpinner();
    document.getElementById('message').textContent = `⛔️ ${error.name}`;
    document.getElementById('context').textContent = `${error.message}`;
  }
};

const handleUnsupported = () => {
  document.getElementById('message').append('⚠️ Unsupported Browser');
  document
    .getElementById('context')
    .append(
      'Your browser does not support the features required to render this\
      site. Please consider <a href="https://browsehappy.com"> upgrading to a\
      modern browser</a>.'
    );
};

window.addEventListener('load', () => {
  isSupported ? handleSupported() : handleUnsupported();
});

window.addEventListener('load', () => {
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
});
