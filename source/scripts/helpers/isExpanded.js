/**
 * Check if `aria-expanded` is true
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
const isExpanded = (element) => {
  return element.getAttribute('aria-expanded') === 'true';
};

export default isExpanded;
