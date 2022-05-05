const FRAMES = Object.freeze([
  '🕛',
  '🕐',
  '🕑',
  '🕒',
  '🕓',
  '🕔',
  '🕕',
  '🕖',
  '🕗',
  '🕘',
  '🕙',
  '🕚'
]);

const spinner = document.getElementById('spinner');
const interval = 1000 / FRAMES.length;
let frame = 0;
let startTime = 0;
let spinnerId;

export const startSpinner = (timeOrigin) => {
  if (timeOrigin >= startTime + interval) {
    spinner.innerHTML = FRAMES[frame];
    frame = ++frame % FRAMES.length;
    startTime = timeOrigin;
  }

  spinnerId = requestAnimationFrame(startSpinner);
};

export const stopSpinner = () => cancelAnimationFrame(spinnerId);
