const rule = require("..");

describe("Basic use", function() {
  testRule(rule, {
    ruleName: rule.ruleName,
    config: [true],
    accept: [".a{}", ".a{/**/}", ".a{prop: value; prop2: value2;}"].map(
      code => ({ code })
    ),
    reject: [".a{prop: value;}", "#i{prop:value;}"].map(code => ({ code }))
  });
});

describe("Primary option: threshold configuration", function() {
  testRule(rule, {
    ruleName: rule.ruleName,
    config: [2],
    accept: [
      ".a{}",
      ".a{/**/}",
      ".a{prop: value; prop2: value2; prop3: value3}"
    ].map(code => ({ code })),
    reject: [
      ".a{prop: value;}",
      "#i{prop:value;}",
      ".a{prop: value; prop2: value2;}"
    ].map(code => ({ code }))
  });
});

describe("Secondary option: `ignoreRules` ignores selectors containing String", function() {
  testRule(rule, {
    ruleName: rule.ruleName,
    config: [
      1,
      {
        ignoreRules: ".b"
      }
    ],
    accept: [
      ".b{prop: value;}",
      ".a{}",
      ".a{/**/}",
      ".a{prop: value; prop2: value2;}"
    ].map(code => ({ code })),
    reject: [".a{prop: value;}", "#i{prop:value;}"].map(code => ({ code }))
  });
});

describe("Secondary option: `ignoreRules` ignores selectors matching Regexp", function() {
  testRule(rule, {
    ruleName: rule.ruleName,
    config: [
      1,
      {
        ignoreRules: /b/
      }
    ],
    accept: [
      ".b{prop: value;}",
      ".a{}",
      ".a{/**/}",
      ".a{prop: value; prop2: value2;}"
    ].map(code => ({ code })),
    reject: [".a{prop: value;}", "#i{prop:value;}"].map(code => ({ code }))
  });
});

describe("Secondary option: `ignoreRules` ignores selectors making Function return true", function() {
  testRule(rule, {
    ruleName: rule.ruleName,
    config: [
      1,
      {
        ignoreRules(rule) {
          return rule.selector.indexOf("b") !== -1;
        }
      }
    ],
    accept: [
      ".b{prop: value;}",
      ".a{}",
      ".a{/**/}",
      ".a{prop: value; prop2: value2;}"
    ].map(code => ({ code })),
    reject: [".a{prop: value;}", "#i{prop:value;}"].map(code => ({ code }))
  });
});

describe("Secondary option: `ignoreRules` ignoes selectors making any element of the Array match", function() {
  testRule(rule, {
    ruleName: rule.ruleName,
    config: [
      1,
      {
        ignoreRules: [
          rule => {
            return rule.selector.indexOf("b") !== -1;
          },
          "c",
          /d/
        ]
      }
    ],
    accept: [
      ".b{prop: value;}",
      ".c{prop: value;}",
      ".d{prop: value;}",
      ".a{}",
      ".a{/**/}",
      ".a{prop: value; prop2: value2;}"
    ].map(code => ({ code })),
    reject: [".a{prop: value;}", "#i{prop:value;}"].map(code => ({ code }))
  });
});

describe("Error message", function() {
  testRule(rule, {
    ruleName: rule.ruleName,
    config: [true],
    accept: [].map(code => ({ code })),
    reject: [".a{prop: value;}"].map(code => ({
      code,
      message:
        ".a has less than 1 declaration(s). You might want to consider using a utility class instead (prefer-utility/prefer-utility)"
    }))
  });
});
