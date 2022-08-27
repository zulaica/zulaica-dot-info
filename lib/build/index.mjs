import processjs from './processjs.mjs';
import processcss from './processcss.mjs';
import processhtml from './processhtml.mjs';
import preflight from './preflight.mjs';
import { EMOJI } from './constants.mjs';
import { reportError } from './shared.mjs';

const build = async () => {
  console.info(`${EMOJI.construction} Building release`);

  try {
    await preflight();
    await processcss();
    await processjs();
    await processhtml();
    console.info(`${EMOJI.partyPopper} Release built successfully\n`);
  } catch (error) {
    reportError(error);
  }
};

build();
