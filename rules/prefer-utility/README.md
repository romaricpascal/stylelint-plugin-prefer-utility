prefer-utility/prefer-utility
===

Warns if a rule has so few declarations that you might be prefer using a utility class instead of it.

> **Legend**
>
> *TBD*: To Be Done
> *UC*: Under consideration

## Primary option

The number of declarations above which you prefer *not* using a utility class. Possible values:

 - any positive integer value
 - `true` (equivalent to `1`)

## Secondary options

 - [TBD] `ignoreRules` (`String`,`RegExp` or `Function`) to ignore specific rules (eg. prefixed with `u-`, `a-`, that don't match a BEM block name, that have a higher specificity than "0 0 1 0" or "0 1 0 0" (implement your own function))