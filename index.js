const { createPlugin } = require("stylelint");
const rules = require("./rules");

const rulesPlugins = rules.map(rule => {
  return createPlugin(rule.ruleName, rule);
});

module.exports = rulesPlugins;
