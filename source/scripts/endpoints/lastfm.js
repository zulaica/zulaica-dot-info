import proxyURL from './proxyURL.js';
import DATE_TIME_FORMAT from '../helpers/dateTimeFormat.js';

const trackTerm = document.createElement('dt');
const trackDetails = document.createElement('dd');

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

export const updateLatestTrack = async () => {
  try {
    await fetchLatestTrack();
    const trackData = JSON.parse(localStorage.getItem('latest_track'));

    updateTrackTerm(trackData);
    updateTrackDetails(trackData);
  } catch ({ message }) {
    console.error(message);
  }
};

const updateTrackTerm = ({ nowPlaying }) => {
  trackTerm.textContent = nowPlaying ? 'Listening to' : 'Listened to';
};

const updateTrackDetails = ({ url, name, artist, timestamp }) => {
  let details = `&ldquo;<a href="${url}" title="${name} on Last.fm">${name}</a>&rdquo; by ${artist}`;

  if (timestamp) {
    const datetime = new Date(timestamp).toISOString();
    const formattedDateTime = new Intl.DateTimeFormat(
      'en-US',
      DATE_TIME_FORMAT
    ).format(timestamp);

    details += `<br /><time datetime="${datetime}">${formattedDateTime}</time>`;
  }

  trackDetails.innerHTML = details;
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

  if (trackData) {
    updateTrackTerm(trackData);
    updateTrackDetails(trackData);

    aboutList.append(trackTerm, trackDetails);
  }
};
