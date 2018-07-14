stylelint-plugin-prefer-utility
===

> A [Stylelint] plugin to let you know when you might be better off using a [utility class][utility-class]rather than creating a new one.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Travis CI status](https://travis-ci.org/rhumaric/stylelint-plugin-prefer-utility.svg?branch=master)](https://travis-ci.org/rhumaric/stylelint-plugin-prefer-utility) [![Appveryor status](https://ci.appveyor.com/api/projects/status/iglqf8br12y2psrk/branch/master?svg=true)](https://ci.appveyor.com/project/rhumaric/stylelint-plugin-prefer-utility/branch/master)


The plugin provides a `prefer-utility/prefer-utility` rule that compares the number of declarations in each ruleset with a [configurable threshold][primary-option].

It warns you if that number is equal or below that threshold, so that you can avoid introducing a new rule for a so few properties.

You'll probably want to avoid certain rules, too. Like your utility classes for example... they're already utility classes.

For this, the rule can be [configured to ignore some rulesets][secondary-option-ignoreRules] through `String`/`RegExp` matching on the selector or a custom `Function`.

> As CSS projects file organisation and naming schemes vary greatly from one to another, the plugin **does only the warning bit**. If you chose to listen to the warning, it's up to you to:
>
> - write the utility class, however best suits your project,
> - clean up the class that triggered the warning to keep things tidy ;)
>
> That said, there might be room for some help in the warning message. If you'd find this handy, please join [the discussion on this issue][issue-message]

Getting started
---

The package will soon be available on [NPM] and will be installed via:

```sh
npm install stylelint-plugin-prefer-utility
```

It provides a [shareable config] you can extend to quickly add the rule to you current `.stylelintrc`. With this configuration, it will:

- warn when there's 1 declaration (as utility classes generally have only one declaration),
- ignore any selector that's not a single class or id.

```js
{
  "extends": [
    "stylelint-plugin-prefer-utility/config"
  ]
}
```

You can then override the options for the [`prefer-utility/prefer-utility` rule][rule-prefer-utility] as best suits your needs:

```js
{
  "extends": [
    "stylelint-plugin-prefer-utility/config"
  ],
  "rules": [
    "prefer-utility/prefer-utility": [
      // If you prefer only creating new classes
      // for more than 2 declarations
      2, {
        // If your utility classes are prefixed with `u-`
        ignoreRules: /^.u-/
      }]
  ]
}
```

> If you need it for creating your own `ignoreRules`, you can reuse the helper function used by the shareable config for testing if a selector is a single class or ID with:
> ```js
>  targetsSingleClassOrId = require('stylelint-plugin-prefer-utility/lib/targetsSingleClassOrId')`
>  ```
> or
> ```js
>  import targetsSingleClassOrId from 'stylelint-plugin-prefer-utility/lib/targetsSingleClassOrId'`
>  ```

[Stylelint]: https://stylelint.io/
[shareable config]: https://stylelint.io/user-guide/configuration/#extends
[NPM]: https://www.npmjs.com/
[issue-message]: https://github.com/rhumaric/stylelint-plugin-prefer-utility/issues/5
[rule-prefer-utility]: rules/prefer-utility/README.md
[primary-option]: rules/prefer-utility/README.md#primay-option
[secondary-option-ignoreRules]: rules/prefer-utilty/README.md#ignoreRules
[utility-class]: https://slides.com/simonswiss/utility-first-all-the-rage#/