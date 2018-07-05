const stylelint = require("stylelint");
const { isString, isRegExp, isFunction } = require("lodash");
const ruleName = "prefer-utility/prefer-utility";

function countDecls(rule) {
  let count = 0;
  rule.walkDecls(function() {
    count++;
  });
  return count;
}

function asThreshold(primaryOption) {
  if (primaryOption >= 0) {
    return primaryOption;
  }

  return 1;
}

function getIgnoreRule(ignoreRules) {
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
        message: ""
      });
    });
  };
};
module.exports.ruleName = ruleName;
