import processjs from './processjs.mjs';
import processcss from './processcss.mjs';
import processhtml from './processhtml.mjs';
import preflight from './preflight.mjs';

const build = async () => {
  try {
    await preflight();
    await processcss();
    await processjs();
    await processhtml();
  } catch (error) {
    console.error(error);
  }
};

build();
