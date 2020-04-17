import CONTACT_INFO from './contact.js';
import isSupported from './support.js';

const instagramURL = 'https://www.instagram.com/zulaica/?__a=1';

const validateResponse = response => {
  if (!response.ok) {
    throw new Error(
      `${response.statusText}` || '😞 An unknown error has occurred.'
    );
  }

  return response.json();
};

const normalizeResponse = response => {
  const latestPost =
    response.graphql.user.edge_owner_to_timeline_media.edges[0].node;
  return {
    accessibility_caption:
      latestPost.accessibility_caption || 'Accessibility caption not provided',
    caption:
      latestPost.edge_media_to_caption.edges[0] &&
      latestPost.edge_media_to_caption.edges[0].node.text,
    date: new Date(latestPost.taken_at_timestamp * 1000),
    image: latestPost.display_url
  };
};

const handleSupported = () =>
  fetch(instagramURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('⛔️ Something went wrong');
      }

      return response;
    })
    .then(response => validateResponse(response))
    .then(response => normalizeResponse(response))
    .then(payload => {
      import('./Meta/index.js').then(module => module.default(payload));
      import('./Meta/parallax.js').then(module =>
        document.addEventListener('mousemove', module.default)
      );
    })
    .catch(error => {
      document.getElementById('message').textContent = `⛔️ ${error}`;
      if (
        error
          .toString()
          .includes(
            'TypeError: NetworkError when attempting to fetch resource.'
          )
      ) {
        document.getElementById('context').innerHTML =
          'This error may occur if you have the\
          <a href="https://addons.mozilla.org/en-US/firefox/addon/facebook-container/">\
          Mozilla Facebook Container Extension</a> enabled. The extension\
          prevents loading the Instagram API from the private/unsupported\
          endpoint that is currently being used to display my latest post.\
          It is a known issue and a solution using the\
          <a href="https://developers.facebook.com/docs/instagram-basic-display-api/reference/media">\
          Instagram Basic Display API</a> is currently in development.';
      }
    });

const handleUnsupported = () => console.info('handleUnsupported');

window.addEventListener('load', () => {
  isSupported ? handleSupported() : handleUnsupported();
});

window.addEventListener('DOMContentLoaded', () => {
  console.info(`%c ${CONTACT_INFO}`, 'font-family: monospace;');
});
