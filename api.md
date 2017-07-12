Zoidberg API
============

```js
const {
    createRule,
    createKeyframe,
    findRules,
    findKeyframes,
    removeRules,
    removeKeyframes,
    findRulesToCss,
    findRulesToAst,
    findKeyframesToCss,
    findKeyframesToAst,
    rulesToCss,
    rulesToAst,
    keyframesToCss,
    keyframesToAst
} = myZoidberg;
```

Create
------

```js
createRule( initialState )
```
Creates and returns a new rule. The new rule is stored an internal rule collection.

**Arguments**

`initialState` *{Object}*: Must include at minimum a valid `animation-name` property with an *{Array}* value containing one *{String}* name.

**Returns**

*{Object}*: Rule. If errors were present during the setting of `initialState`, an *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors.

----

```js
createKeyframe( initialState )
```
Creates and returns a new keyframe. The new keyframe is stored in an internal keyframe collection.

**Arguments**

`initialState` *{Object}*: Must include at minimum a valid `name` property with a *{String}* value.

**Returns**

*{Object}*: Keyframe. If errors were present during the setting of `initialState`, an *{Object}* is returned which includes an `error` property with an *{Array}* value containing the errors.

----

Find
----

----

```js
findRules( searchState )
```
Finds rules in the internal rule collection that have a state which matches `searchState`.

**Arguments**

`searchState` *{Object}*: State to search for. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.

**Returns**

*{Array}*: Matching rules; each is an *{Object}*. If `searchState` was not valid or no matching rules are found, an empty *{Array}* is returned.

----

```js
findKeyframes( searchState )
```
Finds keyframes in the internal keyframe collection that have a state which matches `searchState`.

**Arguments**

`searchState` *{Object}*: State to search for. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.

**Returns**

*{Array}*: Matching keyframes; each is an *{Object}*. If `searchState` was not valid or no matching rules are found, an empty *{Array}* is returned.

----

Remove
------

```js
removeRules( searchState )
```
Finds and removes rules in the internal rule collection that have a state which matches `searchState`.

**Arguments**

`searchState` *{Object}*: State to search for. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.

**Returns**

*{Array}*: Removed rule states; each is an *{Object}*. If `searchState` was not valid or no matching rules are found, an empty *{Array}* is returned.

----

```js
removeKeyframes( searchState )
```
Finds and removes keyframes in the internal keyframe collection that have a state which matches `searchState`.

**Arguments**

`searchState` *{Object}*: State to search for. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.

**Returns**

*{Array}*: Removed keyframe states; each is an *{Object}*. If `searchState` was not valid or no matching keyframes are found, an empty *{Array}* is returned.

----

Export
------

```js
findRulesToCss( options, searchState )
```

Finds and exports rules in the internal rule collection that have a state which matches `searchState`. Each rule is exported as a *{String}* of css.

**Arguments**

`options` *{Object}*:  Used for css formatting. Valid properties are:

- `innerIndent` *{Number}*: indent within the curly brackets which hold a css property
- `rpad` *{Number}*: padding from the right of a value to a css property
- `shorthand` *{Boolean}*: if true, exports the first rule of each found rule *{Object}* in shorthand css animation form.

`searchState` *{Object}*: State to search for. If `searchState` is undefined, the entire rule collection is exported. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.


**Returns**

*{Array}*: Rule css; each is a *{String}*. If `searchState` was not valid or no matching rules are found, an empty *{Array}* is returned.

----

```js
findKeyframesToCss( options, searchState )
```

Finds and exports keyframes in the interanl keyframe collection that have a state which matches `searchState`. Each keyframe is exported as a *{String}* of css.

**Arguments**

`options` *{Object}*:  Used for css formatting. Valid properties are:

- `outerIndent` *{Number}*: indent at the css property name
- `innerIndent` *{Number}*: indent within the curly brackets which hold a css property
- `rpad` *{Number}*: padding from the right of a value to a css property

`searchState` *{Object}*: State to search for. If `searchState` is undefined, the entire keyframe collection is exported. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.


**Returns**

*{Array}*: Keyframe css; each is a *{String}*. If `searchState` was not valid or no matching keyframes are found, an empty *{Array}* is returned.

----

```js
findRulesToAst( searchState )
```

Finds and exports rules in the internal rule collection that have a state which matches `searchState`. Each rule is exported as an ast *{Object}*.

**Arguments**

`searchState` *{Object}*: State to search for. If `searchState` is undefined, the entire rule collection is exported. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.

**Returns**

*{Array}*: Rule ast; each is an *{Object}*. If `searchState` was not valid or no matching rules are found, an empty *{Array}* is returned.

----

```js
findKeyframesToAst( searchState )
```

Finds and exports keyframes in the internal keyframe collection that have a state which matches `searchState`. Each keyframe is exported as an ast *{Object}*.

**Arguments**

`searchState` *{Object}*: State to search for. If `searchState` is undefined, the entire keyframe collection is exported. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.

**Returns**

*{Array}*: Keyframe ast; each is an *{Object}*. If `searchState` was not valid or no matching keyframes are found, an empty *{Array}* is returned.

----

```js
rulesToCss( options, states )
```

Exports each rule state as a *{String}* of css.

**Arguments**

`options` *{Object}*:  Used for css formatting. Valid properties are:

- `innerIndent` *{Number}*: indent within the curly brackets which hold a css property
- `rpad` *{Number}*: padding from the right of a value to a css property
- `shorthand` *{Boolean}*: if true, exports the first rule of each *{Object}* in shorthand css animation form.

`states` *{Array}*: Rule states; each is an *{Object}*. Must be a valid rule state.

**Returns**

*{Array}*: Rule css; each is a *{String}*. If `states` was not valid or contained an invalid rule state, an *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors.

----


```js
keyframesToCss( options, states )
```

Exports each keyframe state as a *{String}* of css.

**Arguments**

`options` *{Object}*:  Used for css formatting. Valid properties are:

- `outerIndent` *{Number}*: indent at the css property name
- `innerIndent` *{Number}*: indent within the curly brackets which hold a css property
- `rpad` *{Number}*: padding from the right of a value to a css property

`states` *{Array}*: Keyframe states; each is an *{Object}*. Must be a valid keyframe state.

**Returns**

*{Array}*: Keyframe css; each is a *{String}*. If `states` was not valid or contained an invalid keyframe state, an *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors.

-----


```js
rulesToAst( states )
```

Exports each rule state as an ast *{Object}*.

**Arguments**

`states` *{Array}*: Rule states; each is an *{Object}*. Must be a valid rule state.

**Returns**

*{Array}*: Rule ast; each is an *{Object}*. If `states` was not valid or contained an invalid rule state, an *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors.

----

```js
keyframesToAst( states )
```

Exports each keyframe state as an ast *{Object}*.

**Arguments**

`states` *{Array}*: Keyframe states; each is an *{Object}*. Must be a valid keyframe state.

**Returns**

*{Array}*: Keyframe ast; each is an *{Object}*. If `states` was not valid or contained an invalid keyframe state, an *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors.