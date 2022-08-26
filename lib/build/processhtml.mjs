#!/usr/bin/env node

import posthtml from 'posthtml';
import htmlnano from 'htmlnano';
import { hash } from 'posthtml-hash';
import { readFile, writeFile } from 'fs/promises';

const processhtml = async () => {
  console.info('\uD83D\uDDC4  Processing HTML');
  try {
    const data = await readFile('source/index.html', { encoding: 'utf8' });
    await posthtml()
      .use(
        htmlnano(
          {
            collapseWhitespace: 'aggressive',
            minifyJs: false,
            removeComments: 'all',
            removeEmptyAttributes: false
          },
          htmlnano.presets.safe
        )
      )
      .use(hash({ path: 'release', pattern: new RegExp(/hash/) }))
      .process(data)
      .then((result) => {
        writeFile('release/index.html', result.html, { encoding: 'utf8' });
      });
  } catch (error) {
    console.info('\u26D4\uFE0F An error has occurred');
    console.error(error);
  }
};

export default processhtml;
