// We're not interested in the validity of the CSS selector
// especially with the ability to do characted escaping
// https://mathiasbynens.be/notes/css-escapes
// All we want is:
//  - Something that starts with `.` or `#` (class or ID)
//  - And doesn't have:
//     + Any of the characters for combining selectors (` `,`+`,`~`,`>`)
//     + A `:`, used for pseudo-classes and pseudo-elements
//     + A [, used for attribute selectors
const REGEXP = /^[.#][^~>+\s:[]*$/;

module.exports = function targetsSingleClassOrId(selectorText) {
  const selectors = selectorText.split(",");
  return selectors.some(function(selector) {
    return REGEXP.test(selector.trim());
  });
};
