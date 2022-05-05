import style from './style.js';

const section = document.querySelector('section');

const scaffoldLayout = async (data) => {
  const { default: media } = await import('./img.js');

  return new Promise((resolve, reject) => {
    media.src = data.thumbnail;

    media.onload = () => {
      document.documentElement.style.setProperty(
        '--image-url',
        `url('${data.thumbnail}')`
      );
      resolve(data);
    };

    media.onerror = () => {
      reject('⛔️ Error: Unable to load media.');
    };
  });
};

const handleSuccess = (data) => {};

const handleError = (error) => {
  const isFirefox = navigator.userAgent.includes('Firefox');
  const fbContainerMessage =
    'This error may occur if you have the\
  <a href="https://addons.mozilla.org/en-US/firefox/addon/facebook-container/">\
  Mozilla Facebook Container Extension</a> enabled. The extension\
  prevents images loading from Instagram if this site is not allowed in\
  Facebook Container.';

  section.className = 'error';
};

const renderContent = () => {
  const shadowRoot = section.attachShadow({ mode: 'closed' });
  shadowRoot.append(style);
};

const app = async (data) => {
  try {
    await scaffoldLayout(data);
    handleSuccess(data);
  } catch (error) {
    handleError(error);
  }

  return renderContent();
};

export default app;
