const baseDomain = (hostname) => hostname.split('.').slice(-2).join('.');

const proxyURL =
  baseDomain(window.location.hostname) === 'zulaica.info'
    ? 'https://zulaica.dev'
    : 'http://localhost:3001';

export default proxyURL;
