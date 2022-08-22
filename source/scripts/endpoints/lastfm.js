import proxyURL from './proxyURL.js';

const endpoint = new URL('/lastfm', proxyURL);

const normalizeTrack = (responseBody) => {
  const {
    artist: { '#text': artist },
    date,
    name,
    url,
    '@attr': attr
  } = responseBody.recenttracks.track[0];
  const timestamp = date ? date.uts * 1000 : null;
  const nowPlaying = attr.nowplaying ?? null;

  return {
    artist,
    name,
    nowPlaying,
    timestamp,
    url
  };
};

const setLatestSong = async () => {
  const response = await fetch(endpoint);
  const responseBody = response.ok && (await response.json());
  const latestTrack = normalizeTrack(responseBody);

  if (latestTrack === JSON.parse(localStorage.getItem('latest_track'))) return;

  localStorage.setItem('latest_track', JSON.stringify(latestTrack));
};

const applyLatestSong = async () => {
  try {
    await setLatestSong().catch(({ message }) => console.error(message));
  } finally {
    const trackData = localStorage.getItem('latest_track');

    if (trackData) {
      const { artist, name, nowPlaying, timestamp, url } =
        JSON.parse(trackData);
      const aboutList = document.getElementById('about-list');
      const trackTerm = document.createElement('dt');
      const trackDetails = document.createElement('dd');
      trackTerm.textContent = 'Listening to';
      trackDetails.innerHTML = `&ldquo;<a href="${url}" title="${name} on Last.fm">${name}</a>&rdquo; by ${artist}`;

      aboutList.append(trackTerm, trackDetails);
    }
  }
};

export default applyLatestSong;
