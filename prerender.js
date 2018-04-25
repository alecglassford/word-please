#! /usr/bin/env node

const fs = require('fs');

require('svelte/ssr/register');

const App = require('./src/App.html');

const { html } = App.render();
const outer = fs.readFileSync('./src/index.html', 'utf8');
const result = outer.replace('~~INJECT_APP_HERE~~', html);
fs.writeFileSync('./public/index.html', result);
