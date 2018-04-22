/* eslint-env serviceworker */

const CACHE_NAME = 'wordplease1';
const URLS = ['/', '/bundle.js', '/load-words.js', 'global.css', 'favicon.ico',
  'https://unpkg.com/bootstrap@4.0.0/dist/css/bootstrap-reboot.min.css',
  'https://unpkg.com/word-list@2.0.0/words.txt'];

self.addEventListener('install', (ev) => { // eslint-disable-line no-restricted-globals
  ev.waitUntil(caches.open(CACHE_NAME)
    .then(cache => cache.addAll(URLS))
    .then(() => {
      self.skipWaiting(); // eslint-disable-line no-restricted-globals
    }));
});

self.addEventListener('activate', (ev) => { // eslint-disable-line no-restricted-globals
  ev.waitUntil(caches.keys()
    .then((keys) => {
      const oldKeys = keys.filter(k => k !== CACHE_NAME);
      const deletions = oldKeys.map(k => caches.delete(k));
      return Promise.all(deletions);
    }));
});

self.addEventListener('fetch', (ev) => { // eslint-disable-line no-restricted-globals
  if (!ev.request.url.startsWith('https')) return;
  ev.respondWith(caches.match(ev.request)
    .then(res => res || fetch(ev.request)));
});
