import { DATETIME_OPTIONS, EMOJI, MAX_RETRIES } from "../helpers/constants.js";
import proxyURL from "./proxyURL.js";

const aboutList = document.getElementById("about-list");
const trackDetails = document.createElement("dd");
const trackStatus = document.createElement("dt");
const service = "[LastFM]";

let elementsAppended = false;
let retries = 0;

const LastFM = Object.freeze({ init, update });
export default LastFM;

/*******************************************************************************
 * Methods
 ******************************************************************************/
async function init() {
  const cachedData = _getCachedData();
  const lastFMInitCompleted = new Event("LastFMInitCompleted");

  if (cachedData) {
    _refreshLatestTrack(cachedData);
  }

  await update();
  window.dispatchEvent(lastFMInitCompleted);
}

async function update() {
  try {
    const data = await _fetchData();

    _refreshLatestTrack(data);
  } catch ({ message }) {
    console.error(`${service}`, `${EMOJI.pensiveFace} Error: ${message}`);

    retries += 1;

    if (retries >= MAX_RETRIES) {
      console.warn(
        `${service}`,
        `${EMOJI.pensiveFace} Maximum retry attempts have been reached.`
      );
      console.info(
        `${service}`,
        `${EMOJI.technologist} Stopping LastFM poller.`
      );

      const lastFMMaxRetries = new Event("LastFMMaxRetries");
      window.dispatchEvent(lastFMMaxRetries);
    }
  }
}

/*******************************************************************************
 * Helpers
 ******************************************************************************/
function _appendElements() {
  if (elementsAppended) return;

  aboutList.append(trackStatus, trackDetails);
  elementsAppended = true;
}

function _getCachedData() {
  try {
    const cached = localStorage.getItem("latest_track");

    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

async function _fetchData() {
  console.info(
    `${service}`,
    `${EMOJI.technologist} Updating latest track data…`
  );

  const endpoint = new URL("/lastfm", proxyURL);

  try {
    const response = await fetch(endpoint);

    const {
      recenttracks: {
        track: { 0: data }
      }
    } = await response.json();
    const latestData = _formatData(data);

    localStorage.setItem("latest_track", JSON.stringify(latestData));
    console.info(
      `${service}`,
      `${EMOJI.partyingFace} Latest track data updated and cached.`
    );

    return latestData;
  } catch {
    console.warn(
      `${service}`,
      `${EMOJI.personShrugging} Unable to update latest track data.`
    );
    console.info(
      `${service}`,
      `${EMOJI.technologist} Attempting to use cached track data.`
    );

    const cachedData = _getCachedData();

    if (!cachedData) {
      throw new Error("Cached track data is not available.");
    }

    return cachedData;
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

function _refreshLatestTrack(data) {
  _appendElements();
  _updateStatus(data.nowPlaying);
  _updateDetails(data);
}

function _updateDetails({ url, title, artist, timestamp }) {
  trackDetails.innerHTML = "";

  const link = document.createElement("a");
  link.href = url;
  link.title = `${title} on Last.fm`;
  link.textContent = title;

  trackDetails.append(link);
  trackDetails.append(document.createElement("br"));
  trackDetails.append(document.createTextNode(`by ${artist}`));

  if (timestamp) {
    trackDetails.append(document.createElement("br"));
    trackDetails.append(_createTimeElement(timestamp));
  }
}

function _updateStatus(nowPlaying) {
  trackStatus.textContent = nowPlaying ? "Listening to" : "Listened to";
}

function _createTimeElement(timestamp) {
  const timeElement = document.createElement("time");
  const datetime = new Date(timestamp).toISOString();
  const formattedDateTime = new Intl.DateTimeFormat(
    "en-US",
    DATETIME_OPTIONS
  ).format(timestamp);

  timeElement.datetime = datetime;
  timeElement.textContent = formattedDateTime;

  return timeElement;
}
