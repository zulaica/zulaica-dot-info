// const shadowDomSupported = Boolean(
//   Element.prototype.attachShadow && Node.prototype.getRootNode
// );
const shadowDomSupported =
  "attachShadow" in Element.prototype && "getRootNode" in Node.prototype;

// const fetchSupported = Boolean(self.fetch);
const fetchSupported = "fetch" in self;

// const historySupported = Boolean(window.history.pushState);
const historySupported = "pushState" in window.history;

const isSupported = shadowDomSupported && fetchSupported && historySupported;

export default isSupported;
