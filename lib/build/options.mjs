const options = Object.freeze({
  postcss: {
    cssnano: {
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
    },
    url: [
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
    ]
  },
  rollup: {
    input: {
      input: 'source/script.hash.js'
    },
    output: {
      file: 'release/script.hash.js'
    }
  },
  babel: {
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
  },
  posthtml: {
    htmlnano: {
      collapseWhitespace: 'aggressive',
      minifyJs: false,
      removeComments: 'all',
      removeEmptyAttributes: false
    }
  }
});

export default options;
