const rule = require("..");

testRule(rule, {
  ruleName: rule.ruleName,
  config: [true],
  accept: ["el{prop: value;}"].map(code => ({ code })),
  reject: [".a{prop: value;}, #{prop:value;}"].map(code => ({ code }))
});
