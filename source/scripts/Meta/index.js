import style from './style.js';
import figure from './figure.js';
import mediaContainer from './mediaContainer.js';
import figcaption, { content, footer, time, title } from './figcaption.js';
import formatDateTime from './formatDateTime.js';

const section = document.querySelector('section');

const scaffoldLayout = async (data) => {
  const isImage = data.media_type === 'IMAGE';
  const { default: media, mediaStyle } = isImage
    ? await import('./img.js')
    : await import('./video.js');

  style.append(mediaStyle);
  figure.append(mediaContainer);
  mediaContainer.append(media);
  figure.append(figcaption);
  figcaption.append(title, content, footer);
  footer.append(time);

  return new Promise((resolve, reject) => {
    media.src = data.media;
    media.alt = data.accessibility_caption;

    isImage
      ? (media.onload = () => {
          document.documentElement.style.setProperty(
            '--image-url',
            `url('${data.thumbnail}')`
          );
          resolve(data);
        })
      : (media.oncanplaythrough = () => {
          document.documentElement.style.setProperty(
            '--image-url',
            `url('${data.thumbnail}')`
          );
          resolve(data);
        });

    media.onerror = () => {
      reject('⛔️ Error: Unable to load media.');
    };
  });
};

const handleSuccess = (data) => {
  title.append('Instagram');
  content.innerHTML = data.caption
    ? `${data.caption.replace(/(\n\n)/g, '</p><p>').replace(/(\n)/g, '<br />')}`
    : '&nbsp;';
  time.dateTime = `${data.date.toISOString()}`;
  time.append(formatDateTime(data.date, true));
};

const handleError = (error) => {
  const date = new Date();
  const isFirefox = navigator.userAgent.includes('Firefox');
  const fbContainerMessage =
    'This error may occur if you have the\
  <a href="https://addons.mozilla.org/en-US/firefox/addon/facebook-container/">\
  Mozilla Facebook Container Extension</a> enabled. The extension\
  prevents images loading from Instagram if this site is not allowed in\
  Facebook Container.';

  section.className = 'error';
  title.append(error);
  content.innerHTML = isFirefox ? `${fbContainerMessage}` : '&nbsp;';
  time.dateTime = `${date.toISOString()}`;
  time.append(formatDateTime(date));
};

const renderContent = () => {
  const shadowRoot = section.attachShadow({ mode: 'closed' });
  shadowRoot.append(style, figure);
};

const Meta = async (data) => {
  try {
    await scaffoldLayout(data);
    handleSuccess(data);
  } catch (error) {
    handleError(error);
  }

  return renderContent();
};

export default Meta;
