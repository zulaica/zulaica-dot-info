#!/usr/bin/env node

import browserify from 'browserify';
import { writeFile } from 'fs/promises';

const processJs = () => {
  try {
    browserify('source/script.hash.js')
      .transform('babelify', {
        comments: false,
        presets: ['@babel/preset-env'],
        minified: true,
        targets: 'defaults'
      })
      .bundle((error, data) => {
        if (error) return;
        writeFile('release/script.hash.js', data, { encoding: 'utf8' });
      });
  } catch (error) {
    console.error(error);
  }
};

processJs();
