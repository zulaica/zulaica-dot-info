const shadowDomSupported =
  "attachShadow" in Element.prototype && "getRootNode" in Node.prototype;

const fetchSupported = "fetch" in self;

const historySupported = "pushState" in window.history;

function dynamicImportSupported() {
  try {
    new Function("import('')");
    return true;
  } catch (error) {
    switch (error instanceof SyntaxError) {
      case true:
        return false;
      default:
        throw new Error(error);
    }
  }
}

const isSupported =
  shadowDomSupported &&
  fetchSupported &&
  historySupported &&
  dynamicImportSupported();

export default isSupported;
