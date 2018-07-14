prefer-utility/prefer-utility
===

Warns if a rule has so few declarations that you might prefer using a more generic utility class instead of it.

Usage
---

For example:

```js
// Your stylelint configuration
module.exports = {
  // ...
  rules: {
    // ...
    "prefer-utility/prefer-utility": [1, {
      ignoreRules: function(rule) {
        // Replace with
        return false;
      }
    }]
    // ...
  }
  // ...
}
```

Primary option: declaration threshold
---

The rule's primary option lets you set the number of declarations above which you think it's worth introducing a new class rather than a utility class.

- any positive integer value
- `true` (equivalent to `1`)

Secondary options
---

### `ignoreRules`

The `ignoreRules` option allows you to ignore specific CSS rules.
`prefer-utility/prefer-utility` will ignore CSS rules if `ignoreRules` contains:

 - a `String` that the selector contains,
 - a `RegExp` that the selector matches against,
 - a `Function` that returns true when passed the PostCSS Rule about to be checked,
 - an `Array` listing any `String`,`RegExp` or `Function` that would lead to ignore the rule