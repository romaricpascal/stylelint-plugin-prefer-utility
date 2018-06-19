const rules = require("./rules");
const { createPlugin } = require("stylelint");

const rulesPlugins = rules.map(rule => {
  return createPlugin(rule.ruleName, rule);
});

module.exports = rulesPlugins;
