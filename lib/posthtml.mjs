#!/usr/bin/env node

import posthtml from 'posthtml';
import htmlnano from 'htmlnano';
import { hash } from 'posthtml-hash';
import { readFile, writeFile } from 'fs/promises';

const processHtml = async () => {
  try {
    const data = await readFile('source/index.html', { encoding: 'utf8' });
    posthtml()
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
      .use(hash({ path: 'build', pattern: new RegExp(/hash/) }))
      .process(data)
      .then((result) =>
        writeFile('build/index.html', result.html, { encoding: 'utf8' })
      );
  } catch (error) {
    console.error(error);
  }
};

processHtml();
