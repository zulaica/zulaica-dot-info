#!/usr/bin/env node

import posthtml from 'posthtml';
import htmlnano from 'htmlnano';
import { hash } from 'posthtml-hash';
import { readFile, writeFile } from 'fs/promises';
import options from './options.mjs';
import { reportError } from './shared.mjs';

const processhtml = async () => {
  console.info('\uD83D\uDDC4  Processing HTML');
  try {
    const data = await readFile('source/index.html', { encoding: 'utf8' });
    await posthtml()
      .use(htmlnano(options.posthtml.htmlnano, htmlnano.presets.safe))
      .use(hash({ path: 'release', pattern: new RegExp(/hash/) }))
      .process(data)
      .then(({ html }) => {
        writeFile('release/index.html', html, { encoding: 'utf8' });
      });
  } catch (error) {
    reportError(error);
  }
};

export default processhtml;
