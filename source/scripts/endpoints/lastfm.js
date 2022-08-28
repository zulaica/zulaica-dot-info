import proxyURL from './proxyURL.js';
import DATE_TIME_FORMAT from '../helpers/dateTimeFormat.js';

let intervalId;

const normalizeTrack = (trackData) => {
  const {
    artist: { '#text': artist },
    date,
    name,
    url,
    '@attr': attr
  } = trackData;
  const timestamp = date ? date.uts * 1000 : null;
  const nowPlaying = attr?.nowplaying ?? null;

  return {
    artist,
    name,
    nowPlaying,
    timestamp,
    url
  };
};

export const fetchLatestTrack = async () => {
  const endpoint = new URL('/lastfm', proxyURL);

  try {
    const response = await fetch(endpoint);
    const {
      recenttracks: {
        track: { 0: trackData }
      }
    } = response.ok && (await response.json());
    const latestTrack = normalizeTrack(trackData);

    if (latestTrack === JSON.parse(localStorage.getItem('latest_track')))
      return;

    localStorage.setItem('latest_track', JSON.stringify(latestTrack));
  } catch ({ message }) {
    console.error(message);
  }
};

export const renderLatestTrack = () => {
  const trackData = JSON.parse(localStorage.getItem('latest_track'));
  const aboutList = document.getElementById('about-list');
  const trackTerm = document.createElement('dt');
  const trackDetails = document.createElement('dd');

  if (trackData) {
    const { artist, name, nowPlaying, timestamp, url } = trackData;
    trackTerm.textContent = nowPlaying ? 'Listening to' : 'Listened to';
    trackDetails.innerHTML = `&ldquo;<a href="${url}" title="${name} on Last.fm">${name}</a>&rdquo; by ${artist}`;

    if (timestamp) {
      const lineBreak = document.createElement('br');
      const time = document.createElement('time');
      const datetime = new Date(timestamp).toISOString();
      const formattedDateTime = new Intl.DateTimeFormat(
        'en-US',
        DATE_TIME_FORMAT
      ).format(timestamp);

      time.dateTime = datetime;
      time.textContent = formattedDateTime;
      trackDetails.append(lineBreak, time);
    }

    aboutList.append(trackTerm, trackDetails);
  }
};

export const startPolling = () => {
  if (!intervalId) {
    intervalId = setInterval(fetchLatestTrack, 210_000);
  }
};

export const stopPolling = () => {
  clearInterval(intervalId);
  intervalId = null;
};
