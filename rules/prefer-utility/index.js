const stylelint = require("stylelint");
const { isNumber, isString, isRegExp, isFunction, isArray } = require("lodash");
const ruleName = "prefer-utility/prefer-utility";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (threshold, rule) =>
    `${
      rule.selector
    } has less than ${threshold} declaration(s). You might want to consider using a utility class instead`
});

module.exports = function(primaryOption, secondaryOptions) {
  secondaryOptions = secondaryOptions || {};

  const threshold = asThreshold(primaryOption);
  const ignoreRule = getIgnoreRule(secondaryOptions.ignoreRules);

  return function(root, result) {
    // Walk
    root.walkRules(function(rule) {
      const count = countDecls(rule);
      if (ignoreRule(rule)) return;
      if (!count || count > threshold) return;
      // Warn
      stylelint.utils.report({
        ruleName,
        result,
        node: rule,
        line: rule.source.start.line,
        column: rule.source.start.column,
        message: messages.expected(threshold, rule)
      });
    });
  };
};

module.exports.ruleName = ruleName;
module.exports.messages = messages;

function countDecls(rule) {
  let count = 0;
  rule.walkDecls(function() {
    count++;
  });
  return count;
}

function asThreshold(primaryOption) {
  if (isNumber(primaryOption) && primaryOption >= 0) {
    return primaryOption;
  }

  return 1;
}

function getIgnoreRule(ignoreRules) {
  if (isArray(ignoreRules)) {
    const tests = ignoreRules.map(getIgnoreRule);
    return function(rule) {
      return tests.some(test => test(rule));
    };
  }

  if (isString(ignoreRules)) {
    return function(rule) {
      return rule.selector.indexOf(ignoreRules) !== -1;
    };
  }
  if (isRegExp(ignoreRules)) {
    return function(rule) {
      return ignoreRules.test(rule.selector);
    };
  }
  if (isFunction(ignoreRules)) {
    return function(rule) {
      return ignoreRules(rule);
    };
  }

  // Default return a noop
  return function() {};
}
