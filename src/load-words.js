/* eslint-env worker */

// Polyfills
if (!self.Promise) { // eslint-disable-line no-restricted-globals
  importScripts('https://unpkg.com/promise-polyfill@7.1.2/dist/promise.min.js');
}
if (!self.fetch) { // eslint-disable-line no-restricted-globals
  importScripts('https://unpkg.com/whatwg-fetch@2.0.4/fetch.js');
}

fetch('https://unpkg.com/word-list@2.0.0/words.txt')
  .then(res => res.text())
  .then((wordsStr) => {
    const words = wordsStr.split('\n');
    postMessage(words);
    close(); // eslint-disable-line no-restricted-globals
  });
