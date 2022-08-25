#!/usr/bin/env node

import postcss from 'postcss';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import url from 'postcss-url';
import cssnanoPlugin from 'cssnano';
import { readFile, writeFile } from 'fs/promises';

const processCss = async () => {
  try {
    const data = await readFile('source/style.hash.css', {
      encoding: 'utf8'
    });
    postcss()
      .use(atImport())
      .use(postcssPresetEnv())
      .use(
        url([
          {
            filter: '**/*.woff2',
            url: 'copy'
          },
          {
            filter: '**/*.woff',
            url: 'copy'
          },
          {
            filter: '**/*.ttf',
            url: 'copy'
          },
          {
            filter: '**/*.webp',
            url: (asset) => asset.relativePath
          },
          {
            filter: '**/*.jpg',
            url: (asset) => asset.relativePath
          }
        ])
      )
      .use(
        cssnanoPlugin({
          preset: [
            'advanced',
            {
              minifyFontValues: false,
              normalizeUrl: false,
              normalizeString: {
                preferredQuote: 'single'
              }
            }
          ]
        })
      )
      .process(data, {
        from: 'source/style.hash.css'
      })
      .then((result) =>
        writeFile('release/style.hash.css', result.css, { encoding: 'utf8' })
      );
  } catch (error) {
    console.error(error);
  }
};

processCss();
