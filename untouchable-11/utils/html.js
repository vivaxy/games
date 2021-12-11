/**
 * @since 2021-12-11
 * @author vivaxy
 */
export function createElement(tagName, attrs, children = []) {
  const $tag = document.createElement(tagName);
  Object.keys(attrs).forEach(function(key) {
    $tag.setAttribute(key, attrs[key]);
  });
  children.forEach(function(child) {
    $tag.appendChild(child);
  });
  return $tag;
}

export function div(className) {
  return createElement('div', { class: className });
}
