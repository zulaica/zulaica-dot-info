#!/usr/bin/env node

import postcss from 'postcss';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import url from 'postcss-url';
import cssnanoPlugin from 'cssnano';
import { readFile, writeFile } from 'fs/promises';

const processcss = async () => {
  console.info('\uD83C\uDFA8 Processing styles');
  try {
    const data = await readFile('source/style.hash.css', {
      encoding: 'utf8'
    });
    await postcss()
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
      .then(({ css }) => {
        writeFile('release/style.hash.css', css, { encoding: 'utf8' });
      });
  } catch (error) {
    console.info('\u26D4\uFE0F An error has occurred');
    console.error(error);
  }
};

export default processcss;
