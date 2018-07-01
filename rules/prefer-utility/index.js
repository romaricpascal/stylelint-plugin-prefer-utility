const stylelint = require("stylelint");

const ruleName = "prefer-utility/prefer-utility";

function countDecls(rule) {
  let count = 0;
  rule.walkDecls(function () {
    count++
  });
  return count;
}

module.exports = function () {
  return function (root, result) {
    // Walk
    root.walkRules(function (rule) {
      const count = countDecls(rule);
      if (!count || count > 1) return;
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
