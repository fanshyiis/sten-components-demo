import path from 'path';
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import cssnano from 'cssnano';

const globalStyle = path.resolve('../sten-themes', 'lib/index.css');

export const config: Config = {
  namespace: 'sten-design-components',
  taskQueue: 'async',
  devServer: { openBrowser: false },
  globalScript: 'src/core/index',
  globalStyle,
  buildEs5: 'prod',
  plugins: [
    sass(),
    postcss({
      plugins: [
        cssnano({
          preset: [
            'default',
            {
              autoprefixer: { browsers: 'last 2 versions', add: true },
              zindex: false,
            },
          ],
        }),
      ],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      baseUrl: process.env.NODE_ENV == 'online' ? '/demo' : '',
      copy: [{ src: './html/*', dest: './', warn: true }],
    },
  ],
  preamble: 'Built with Stencil\nCopyright (c) sten.',
  testing: {
    browserHeadless: false,
  },
};
