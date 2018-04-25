import { exec } from 'child_process';

import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import sass from 'rollup-plugin-sass';
import purifycss from 'purify-css';

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

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration —
      // consult the documentation for details:
      // https://github.com/rollup/rollup-plugin-commonjs
      resolve(),
      commonjs(),

      // If we're building for production (npm run build
      // instead of npm run dev), transpile and minify
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
  { // Bundle main CSS
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
