#!/usr/bin/env node

import { rollup } from 'rollup';
import { transformFromAstAsync } from '@babel/core';
import { parse } from '@babel/parser';
import { readFile, writeFile } from 'fs/promises';
import options from './options.mjs';
import { reportError } from './shared.mjs';

const bundlejs = async () => {
  let bundle;

  try {
    bundle = await rollup(options.rollup.input);
  } catch (error) {
    reportError(error);
  }

  if (bundle) {
    await bundle.write(options.rollup.output);
    await bundle.close();
  }
};

const processjs = async () => {
  console.info('\uD83D\uDCCA Processing scripts');

  try {
    await bundlejs();
    const data = await readFile('release/script.hash.js', {
      encoding: 'utf8'
    });
    const ast = parse(data, {
      sourceType: 'module'
    });

    const { code } = await transformFromAstAsync(ast, data, options.babel);
    await writeFile('release/script.hash.js', code, { encoding: 'utf8' });
  } catch (error) {
    reportError(error);
  }
};

export default processjs;
