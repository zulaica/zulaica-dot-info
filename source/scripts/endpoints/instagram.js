import proxyURL from './proxyURL.js';

const endpoint = new URL('/instagram', proxyURL);
// `thumbnail_url` is provided for video posts, `media_url` for image posts
const imageURL = ({ data }) => data[0].thumbnail_url || data[0].media_url;

export const fetchLatestImage = async () => {
  try {
    const response = await fetch(endpoint);
    const responseBody = response.ok && (await response.json());
    const imageHREF = imageURL(responseBody);

    if (imageHREF === localStorage.getItem('image_href')) return;

    localStorage.setItem('image_href', imageHREF);
  } catch ({ message }) {
    console.error(message);
  }
};

export const applyLatestImage = () => {
  const imageHREF = localStorage.getItem('image_href');

  if (imageHREF) {
    const image = document.createElement('img');
    image.src = imageHREF;

    image.onload = () => {
      document.documentElement.style.setProperty(
        '--image-url',
        `url('${imageHREF}')`
      );
    };

    // Hide background image preference toggle on error
    image.onerror = () => {
      document
        .getElementById('background-item')
        .style.setProperty('display', 'none');
    };
  }
};
