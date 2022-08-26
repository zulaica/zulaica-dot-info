import processjs from './processjs.mjs';
import processcss from './processcss.mjs';
import processhtml from './processhtml.mjs';
import preflight from './preflight.mjs';
import { reportError } from './shared.mjs';

const build = async () => {
  console.info('\uD83D\uDEA7 Building release');

  try {
    await preflight();
    await processcss();
    await processjs();
    await processhtml();

    console.info('\uD83C\uDF89 Release built successfully\n');
  } catch (error) {
    reportError(error);
  }
};

build();
