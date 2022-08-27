import proxyURL from './proxyURL.js';

// `thumbnail_url` is provided for video posts, `media_url` for image posts
const imageURL = (postData) => postData.thumbnail_url || postData.media_url;

export const fetchLatestImage = async () => {
  const endpoint = new URL('/instagram', proxyURL);

  try {
    const response = await fetch(endpoint);
    const {
      data: { 0: postData }
    } = response.ok && (await response.json());
    const imageHREF = imageURL(postData);

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
