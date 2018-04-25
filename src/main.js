import App from './App.html';

const app = new App({
  target: document.querySelector('main'),
  hydrate: true,
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

export default app;
