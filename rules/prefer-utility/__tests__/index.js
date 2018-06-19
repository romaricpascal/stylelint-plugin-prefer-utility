const rule = require("..");

testRule(rule, {
  ruleName: rule.ruleName,
  config: [true],
  accept: [].map(code => ({ code })),
  reject: [].map(code => ({ code }))
});
