import { DATETIME_OPTIONS, EMOJI } from "../helpers/constants.js";
import proxyURL from "./proxyURL.js";

const aboutList = document.getElementById("about-list");
const trackDetails = document.createElement("dd");
const trackStatus = document.createElement("dt");

async function init() {
  const cachedData = JSON.parse(localStorage.getItem("latest_track"));
  const lastFMEvent = new Event("LastFMInitCompleted");

  if (cachedData) {
    aboutList.append(trackStatus, trackDetails);
    _updateStatus(cachedData.nowPlaying);
    _updateDetails(cachedData);
  }

  await update();
  window.dispatchEvent(lastFMEvent);
}

async function update() {
  try {
    const data = await _fetchData();

    if (!Array.from(aboutList.children).includes(trackStatus)) {
      aboutList.append(trackStatus, trackDetails);
    }

    _updateStatus(data.nowPlaying);
    _updateDetails(data);
  } catch ({ message }) {
    console.error(`[LastFM] ${EMOJI.pensiveFace} Error: ${message}`);
  }
}

async function _fetchData() {
  console.info(`[LastFM] ${EMOJI.technologist} Updating latest track data…`);

  const endpoint = new URL("/lastfm", proxyURL);
  const response = await fetch(endpoint);

  if (response.ok) {
    const {
      recenttracks: {
        track: { 0: data }
      }
    } = await response.json();
    const latestTrack = _formatData(data);

    localStorage.setItem("latest_track", JSON.stringify(latestTrack));
    console.info(`[LastFM] ${EMOJI.partyingFace} Latest track data updated.`);

    return latestTrack;
  } else {
    console.warn(
      `[LastFM] ${EMOJI.personShrugging} Unable to update latest track data; using cache.`
    );

    return JSON.parse(localStorage.getItem("latest_track"));
  }
}

function _formatData(data) {
  const {
    artist: { "#text": artist },
    date,
    name: title,
    url,
    "@attr": attr
  } = data;
  const timestamp = date ? date.uts * 1000 : null;
  const nowPlaying = attr?.nowplaying ?? null;

  return { artist, title, nowPlaying, timestamp, url };
}

function _updateDetails({ url, title, artist, timestamp }) {
  const details = `&ldquo;<a href="${url}" title="${title} on Last.fm">${title}</a>&rdquo; by ${artist}`;
  const time = timestamp ? _updateTime(timestamp) : "";

  trackDetails.innerHTML = details + time;
}

function _updateStatus(nowPlaying) {
  trackStatus.textContent = nowPlaying ? "Listening to" : "Listened to";
}

function _updateTime(timestamp) {
  const datetime = new Date(timestamp).toISOString();
  const formattedDateTime = new Intl.DateTimeFormat(
    "en-US",
    DATETIME_OPTIONS
  ).format(timestamp);

  return `<time datetime="${datetime}">${formattedDateTime}</time>`;
}

const LastFM = Object.freeze({ init, update });
export default LastFM;
