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
  const nowPlaying = attr?.nowplaying ?? null;

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
      trackTerm.textContent = nowPlaying ? 'Listening to' : 'Listened to';
      trackDetails.innerHTML = `&ldquo;<a href="${url}" title="${name} on Last.fm">${name}</a>&rdquo; by ${artist}`;

      if (timestamp) {
        const datetime = new Date(timestamp).toISOString();
        const localizedTimeString = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Los_Angeles',
          timeZoneName: 'short',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }).format(timestamp);

        const lineBreak = document.createElement('br');
        const time = document.createElement('time');
        time.dateTime = datetime;
        time.textContent = localizedTimeString;

        trackDetails.append(lineBreak, time);
      }

      aboutList.append(trackTerm, trackDetails);
    }
  }
};

export default applyLatestSong;
