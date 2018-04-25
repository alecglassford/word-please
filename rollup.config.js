import { exec } from 'child_process';

import purifycss from 'purify-css';
import buble from 'rollup-plugin-buble';
import sass from 'rollup-plugin-sass';
import svelte from 'rollup-plugin-svelte';
import uglify from 'rollup-plugin-uglify';

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/main.js',
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: 'public/bundle.js',
    },
    plugins: [
      svelte({
        dev: !production,
        css: false,
        hydratable: true,
      }),
      production && buble({ exclude: 'node_modules/**' }),
      production && uglify(),
    ],
  },
  {
    input: 'src/load-words.js',
    output: {
      sourcemap: true,
      format: 'es',
      file: 'public/load-words.js',
    },
    plugins: [
      production && buble({ exclude: 'node_modules/**' }),
      production && uglify(),
    ],
  },
  {
    input: 'src/service-worker.js',
    output: {
      sourcemap: true,
      format: 'es',
      file: 'public/service-worker.js',
    },
    plugins: [
      production && buble({ exclude: 'node_modules/**' }),
      production && uglify(),
    ],
  },
  {
    input: 'src/main.scss',
    output: { format: 'es', file: '/dev/null' }, // This doesn't matter
    plugins: [
      sass({
        processor: css => purifycss(['src/*.html'], css, { minify: production }),
        output(styles) {
          exec('node prerender.js', {
            env: Object.assign({ PRERENDER_CSS_STRING: styles }, process.env),
          });
        },
      }),
    ],
  },
];
