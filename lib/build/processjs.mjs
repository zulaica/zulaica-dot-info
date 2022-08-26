#!/usr/bin/env node

import { rollup } from 'rollup';
import { transformFromAstAsync } from '@babel/core';
import { parse } from '@babel/parser';
import { readFile, writeFile } from 'fs/promises';

const inputOptions = Object.freeze({
  input: 'source/script.hash.js'
});

const outputOptions = Object.freeze({
  file: 'release/script.hash.js'
});

const bundlejs = async () => {
  let bundle;

  try {
    bundle = await rollup(inputOptions);
  } catch (error) {
    console.error(error);
  }

  if (bundle) {
    await bundle.write(outputOptions);
    await bundle.close();
  }
};

const processjs = async () => {
  try {
    await bundlejs();
    const data = await readFile('release/script.hash.js', {
      encoding: 'utf8'
    });
    const ast = parse(data, {
      sourceType: 'module'
    });

    const { code } = await transformFromAstAsync(ast, data, {
      presets: [
        [
          '@babel/env',
          {
            targets: 'defaults',
            modules: false
          }
        ]
      ],
      minified: true,
      comments: false,
      babelrc: false,
      configFile: false
    });
    await writeFile('release/script.hash.js', code, { encoding: 'utf8' });
  } catch (error) {
    console.error(error);
  }
};

export default processjs;
