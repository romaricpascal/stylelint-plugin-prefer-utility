const stylelint = require("stylelint");
const { isFinite } = require('lodash');
const ruleName = "prefer-utility/prefer-utility";

function countDecls(rule) {
  let count = 0;
  rule.walkDecls(function () {
    count++
  });
  return count;
}

function asThreshold(primaryOption) {
  if (primaryOption >= 0) {
    return primaryOption;
  }

  return 1;
}

module.exports = function (primaryOption, secondaryOptions, context) {
  context = context || {};

  const threshold = asThreshold(primaryOption);

  return function (root, result) {
    // Walk
    root.walkRules(function (rule) {
      const count = countDecls(rule);
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
