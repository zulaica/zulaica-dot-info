import style from './style.js';
import { updateBackgroundOffset } from './background.js';
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
          resolve(data);
        })
      : (media.oncanplaythrough = () => {
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
  const src = data.thumbnail || data.media;
  document.documentElement.style.setProperty('--image-url', `url('${src}')`);
  document.documentElement.style.setProperty('--offset-x', '0px');
  document.documentElement.style.setProperty('--offset-y', '0px');
  document.addEventListener('mousemove', updateBackgroundOffset, {
    capture: true,
    passive: true
  });
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

const renderContent = (stopSpinner) => {
  const shadowRoot = section.attachShadow({ mode: 'closed' });
  shadowRoot.append(style, figure);
  stopSpinner();
};

const Meta = (data, stopSpinner) => {
  scaffoldLayout(data)
    .then(
      () => handleSuccess(data),
      (error) => handleError(error)
    )
    .then(() => renderContent(stopSpinner));
};

export default Meta;
