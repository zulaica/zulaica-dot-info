import proxyURL from './proxyURL.js';
import { options } from '../helpers/dateTimeFormat.js';

const endpoint = new URL('/lastfm', proxyURL);
const trackTerm = document.createElement('dt');
const trackDetails = document.createElement('dd');
const lineBreak = document.createElement('br');
const time = document.createElement('time');
let intervalId;

const normalizeTrack = (responseBody) => {
  const {
    artist: { '#text': artist },
    date,
    name,
    url,
    '@attr': attr
  } = responseBody.recenttracks.track[0];
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

export const fetchLatestSong = async () => {
  try {
    const response = await fetch(endpoint);
    const responseBody = response.ok && (await response.json());
    const latestTrack = normalizeTrack(responseBody);

    if (latestTrack === JSON.parse(localStorage.getItem('latest_track')))
      return;

    localStorage.setItem('latest_track', JSON.stringify(latestTrack));
  } catch ({ message }) {
    console.error(message);
  }
};

export const renderLatestSong = () => {
  const trackData = JSON.parse(localStorage.getItem('latest_track'));
  const aboutList = document.getElementById('about-list');

  if (trackData) {
    const { artist, name, nowPlaying, timestamp, url } = trackData;
    trackTerm.textContent = nowPlaying ? 'Listening to' : 'Listened to';
    trackDetails.innerHTML = `&ldquo;<a href="${url}" title="${name} on Last.fm">${name}</a>&rdquo; by ${artist}`;

    if (timestamp) {
      const datetime = new Date(timestamp).toISOString();
      const formattedDateTime = new Intl.DateTimeFormat(
        'en-US',
        options
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
    intervalId = setInterval(fetchLatestSong, 210_000);
  }
};

export const stopPolling = () => {
  clearInterval(intervalId);
  intervalId = null;
};
