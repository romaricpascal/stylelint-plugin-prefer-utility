const rule = require("..");

testRule(rule, {
  ruleName: rule.ruleName,
  config: [true],
  accept: [".a{}", ".a{/**/}", ".a{prop: value; prop2: value2;}"].map(code => ({ code })),
  reject: [".a{prop: value;}", "#i{prop:value;}"].map(code => ({ code }))
});

testRule(rule, {
  ruleName: rule.ruleName,
  config: [2],
  accept: [".a{}", ".a{/**/}", ".a{prop: value; prop2: value2; prop3: value3}"].map(code => ({ code })),
  reject: [".a{prop: value;}", "#i{prop:value;}", ".a{prop: value; prop2: value2;}"].map(code => ({ code }))
});
