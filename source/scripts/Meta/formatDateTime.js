const formatDateTime = (dateObject, localized = false) =>
  `${dateObject.toLocaleDateString(
    'en-US',
    localized ? localizedDateFormat : dateFormat
  )} at ${dateObject.toLocaleTimeString(
    'en-US',
    localized ? localizedTimeFormat : timeFormat
  )}`;

const dateFormat = Object.freeze({
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const timeFormat = Object.freeze({
  hour: '2-digit',
  minute: '2-digit'
});

const localizedDateFormat = Object.freeze(
  Object.assign({ timeZone: 'America/Los_Angeles' }, dateFormat)
);

const localizedTimeFormat = Object.freeze(
  Object.assign({ timeZone: 'America/Los_Angeles' }, timeFormat)
);

export default formatDateTime;
