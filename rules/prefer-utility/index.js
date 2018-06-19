const stylelint = require("stylelint");

const ruleName = "prefer-utility/prefer-utility";

module.exports = function () {
  return function (root, result) {
    // Walk
    root.walkDecls(function (decl) {
      // Warn
      stylelint.utils.report({
        ruleName: ruleName,
        result: result,
        node: decl,
        line: decl.source.start.line,
        column: decl.source.start.column,
        message: ""
      });
    });
  };
};
module.exports.ruleName = ruleName;