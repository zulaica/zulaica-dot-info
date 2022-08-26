#!/usr/bin/env node

import postcss from 'postcss';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import url from 'postcss-url';
import cssnanoPlugin from 'cssnano';
import { readFile, writeFile } from 'fs/promises';
import options from './options.mjs';
import { reportError } from './shared.mjs';

const processcss = async () => {
  console.info('\uD83C\uDFA8 Processing styles');
  try {
    const data = await readFile('source/style.hash.css', {
      encoding: 'utf8'
    });
    await postcss()
      .use(atImport())
      .use(postcssPresetEnv())
      .use(url(options.postcss.url))
      .use(cssnanoPlugin(options.postcss.cssnano))
      .process(data, {
        from: 'source/style.hash.css'
      })
      .then(({ css }) => {
        writeFile('release/style.hash.css', css, { encoding: 'utf8' });
      });
  } catch (error) {
    reportError(error);
  }
};

export default processcss;
