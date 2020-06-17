const shadowDomSupported =
  "attachShadow" in Element.prototype && "getRootNode" in Node.prototype;

const fetchSupported = "fetch" in self;

const historySupported = "pushState" in window.history;

const isSupported = shadowDomSupported && fetchSupported && historySupported;

export default isSupported;
