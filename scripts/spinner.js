const FRAMES = Object.freeze([
  '🕛 ',
  '🕐 ',
  '🕑 ',
  '🕒 ',
  '🕓 ',
  '🕔 ',
  '🕕 ',
  '🕖 ',
  '🕗 ',
  '🕘 ',
  '🕙 ',
  '🕚 '
]);

const spinner = document.querySelector('#spinner');
let index = 0;
let spinnerId;

const updateSpinner = () => {
  spinner.innerHTML = FRAMES[index];
  index = ++index % FRAMES.length;
};

export let startSpinner = () => {
  if (!spinnerId) {
    spinnerId = setInterval(updateSpinner, 88.3333333333);
  }
};

export const stopSpinner = () => {
  clearInterval(spinnerId);
  spinnerId = null;
};
