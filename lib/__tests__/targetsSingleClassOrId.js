const classesAndIds = require("../targetsSingleClassOrId");
const ACCEPTED = [
  // Classes
  ".aclass",
  ".aClass",
  ".a-class",
  ".a_class",
  // IDs
  "#anId",
  "#an_id",
  "#an-id",
  // With escaped characters
  ".a-class@breakpoint",
  // Multiple selectors, where one is accepted
  "an-element, .accepted"
];

const REJECTED = [
  // Element selectors
  "anElement",
  // Pseudo elements
  "a:pseudo-element",
  // Attribute selectors
  ".aClass[an-attribute-selector]",
  // Combined selectors
  ".a .combined .selector",
  ".a>.combined>.selector",
  ".a+.combined+.selector",
  ".a~.combined~.selector",
  // Multiple selectors, where all are rejected
  "rejected,rejected"
];

describe("classesAndIds()", function() {
  ACCEPTED.forEach(function(selector) {
    it(`Accepts selector ${selector}`, function() {
      expect(classesAndIds(selector)).toBe(true);
    });
  });

  REJECTED.forEach(function(selector) {
    it(`Rejects selector ${selector}`, function() {
      expect(classesAndIds(selector)).toBe(false);
    });
  });
});
