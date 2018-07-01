const rule = require("..");

testRule(rule, {
  ruleName: rule.ruleName,
  config: [true],
  accept: [".a{}", ".a{/**/}", ".a{prop: value; prop2: value2;}"].map(code => ({ code })),
  reject: [".a{prop: value;}, #i{prop:value;}"].map(code => ({ code }))
});
