import proxyURL from './proxyURL.js';

const endpoint = new URL('/lastfm', proxyURL);

const normalizeTrack = (responseBody) => {
  return {
    artist: responseBody.recenttracks.track[0].artist['#text'],
    title: responseBody.recenttracks.track[0].name,
    url: responseBody.recenttracks.track[0].url
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
  await setLatestSong();
  const { artist, title, url } = JSON.parse(
    localStorage.getItem('latest_track')
  );
  const trackNode = document.getElementById('lastfm-recent-track');
  console.info(trackNode);
  trackNode.innerHTML = `&ldquo;<a href="${url}" title="${title} on Last.fm">${title}</a>&rdquo; by ${artist}`;
};

export default applyLatestSong;
