#! /usr/bin/env node

const fs = require('fs');

require('svelte/ssr/register'); // eslint-disable-line

const App = require('./src/App.html');

const { html } = App.render();
const outer = fs.readFileSync('./src/index.html', 'utf8');
const result = outer.replace('~~INJECT_APP_HERE~~', html)
  .replace('~~INJECT_STYLES_HERE~~', `<style>${process.env.PRERENDER_CSS_STRING}</style>`);
fs.writeFileSync('./public/index.html', result);
