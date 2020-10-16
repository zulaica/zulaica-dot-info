const asyncSupported = !!async function () {}.constructor;

const shadowDomSupported =
  "attachShadow" in Element.prototype && "getRootNode" in Node.prototype;

const fetchSupported = "fetch" in self;

const historySupported = "pushState" in window.history;

const isSupported =
  asyncSupported && shadowDomSupported && fetchSupported && historySupported;

export default isSupported;
