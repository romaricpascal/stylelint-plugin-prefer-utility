const targetsSingleClassOrId = require("./lib/targetsSingleClassOrId");

module.exports = {
  plugins: [__dirname],
  rules: {
    "prefer-utility/prefer-utility": [
      1,
      {
        ignoreRules(rule) {
          return !targetsSingleClassOrId(rule.selector);
        }
      }
    ]
  }
};
