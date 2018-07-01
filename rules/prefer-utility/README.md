prefer-utility/prefer-utility
===

Warns if a rule has so few declarations that you might prefer using a more generic utility class instead of it.

> *Note*: As CSS projects organisation and naming schemes vary greatly from one to another, the plugin **does only the warning bit**. If you chose to listen to the warning, it's up to you to:
>
> - write the utility class, however best suits your project,
> - clean up the replaced class to keep things tidy ;)

## Usage

The plugin provides a `prefer-utility/prefer-utility` rule for which you can pick:

 - a [threshold of declarations](#primary-option) above which you consider it worth to create a new class and **not** use a utility class (will probably be 1 for most projects).
 - a [way to ignore some of the CSS rules](#ignoreRules) (for example, your utility classes), based on `String`/`RegExp` comparison on the selector or a `Function` you provide.

For example:

```js
// Your stylelint configuration
module.exports = {
  // ...
  rules: {
    // ...
    'prefer-utility/prefer-utility': [1, {
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


## Primary option

The rule's primary option lets you set the number of declarations above which you prefer *not* using a utility class. Possible values are:

 - any positive integer value
 - `true` (equivalent to `1`)

## Secondary options

### `ignoreRules`

The `ignoreRules` secondary option allows you to ignore specific CSS rules.
`prefer-utility/prefer-utility` will ignore CSS rules if `ignoreRules` contains:

 - a `String` that the selector contains ,
 - a `RegExp` that the selector matches against,
 - a `Function` that returns true when passed the PostCSS Rule about to be checked.