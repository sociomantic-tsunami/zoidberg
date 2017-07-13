# Table of Contents
  * [Zoidberg API](#zoidberg-api-anchor)

    <h5>Create</h5>

    * [createRule](#createRule-api-anchor)
    * [createKeyframe](#createKeyframe-api-anchor)

    <h5>Find</h5>
      
    * [findRules](#findRules-api-anchor)
    * [findKeyframes](#findKeyframes-api-anchor)
    
    <h5>Remove</h5>
      
    * [removeRules](#removeRules-api-anchor)
    * [removeKeyframes](#removeKeyframes-api-anchor)
    
    <h5>Export</h5>
      
    * [findRulesToCss](#findRulesToCss-api-anchor)
    * [findRulesToAst](#findRulesToAst-api-anchor)
    * [findKeyframesToCss](#findKeyframesToCss-api-anchor)
    * [findKeyframesToAst](#findKeyframesToAst-api-anchor)
    * [rulesToCss](#rulesToCss-api-anchor)
    * [rulesToAst](#rulesToAst-api-anchor)
    * [keyframesToCss](#keyframesToCss-api-anchor)
    * [keyframesToAst](#keyframesToAst-api-anchor)

  * [Rule API](#rule-api-anchor)
  
    <h5>Get</h5>

    * [getErrors](#getErrors-rule-api-anchor)
    * [getEachRule](#getEachRule-api-anchor)
    * [getState](#getState-rule-api-anchor)
    * [getDelay](#getDelay-api-anchor)
    * [getDirection](#getDirection-api-anchor)
    * [getDuration](#getDuration-api-anchor)
    * [getFillMode](#getFillMode-api-anchor)
    * [getName](#getName-rule-api-anchor)
    * [getPlayState](#getPlayState-api-anchor)
    * [getTiming](#getTiming-api-anchor)
    * [getIterationCount](#getIterationCount-api-anchor)

    <h5>Set</h5>

    * [setState](#setState-rule-api-anchor)
    * [setDelay](#setDelay-api-anchor)
    * [setDirection](#setDirection-api-anchor)
    * [setDuration](#setDuration-api-anchor)
    * [setFillMode](#setFillMode-api-anchor)
    * [setName](#setName-rule-api-anchor)
    * [setPlayState](#setPlayState-api-anchor)
    * [setTiming](#setTiming-api-anchor)
    * [setIterationCount](#setIterationCount-api-anchor)

----

Zoidberg API <a id="zoidberg-api-anchor"></a>
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
<a id="createRule-api-anchor"></a>
Creates and returns a new rule. The new rule is stored an internal rule collection.

**Arguments**

`initialState` *{Object}*: Must include at minimum a valid `animation-name` property with an *{Array}* value containing one *{String}* name.

**Returns**

*{Object}*: Rule. If errors were present during the setting of `initialState`, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors.

----

```js
createKeyframe( initialState )
```
<a id="createKeyframe-api-anchor"></a>
Creates and returns a new keyframe. The new keyframe is stored in an internal keyframe collection.

**Arguments**

`initialState` *{Object}*: Must include at minimum a valid `name` property with a *{String}* value.

**Returns**

*{Object}*: Keyframe. If errors were present during the setting of `initialState`, an *{Object}* is returned which includes an `error` property with an *{Array}* value containing the errors.

----

Find
----

```js
findRules( searchState )
```
<a id="findRules-api-anchor"></a>
Finds rules in the internal rule collection that have a state which matches `searchState`.

**Arguments**

`searchState` *{Object}*: State to search for. Must contain valid rule state properties and values. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.

**Returns**

*{Array}*: Matching rules; each is an *{Object}*. If `searchState` was not valid or no matching rules are found, an empty *{Array}* is returned.

----

```js
findKeyframes( searchState )
```
<a id="findKeyframes-api-anchor"></a>
Finds keyframes in the internal keyframe collection that have a state which matches `searchState`.

**Arguments**

`searchState` *{Object}*: State to search for. Must contain valid keyframe state properties and values. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.

**Returns**

*{Array}*: Matching keyframes; each is an *{Object}*. If `searchState` was not valid or no matching rules are found, an empty *{Array}* is returned.

----

Remove
------

```js
removeRules( searchState )
```
<a id="removeRules-api-anchor"></a>
Finds and removes rules in the internal rule collection that have a state which matches `searchState`.

**Arguments**

`searchState` *{Object}*: State to search for. Must contain valid rule state properties and values. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.

**Returns**

*{Array}*: Removed rule states; each is an *{Object}*. If `searchState` was not valid or no matching rules are found, an empty *{Array}* is returned.

----

```js
removeKeyframes( searchState )
```
<a id="removeKeyframes-api-anchor"></a>
Finds and removes keyframes in the internal keyframe collection that have a state which matches `searchState`.

**Arguments**

`searchState` *{Object}*: State to search for. Must contain valid keyframe state properties and values. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.

**Returns**

*{Array}*: Removed keyframe states; each is an *{Object}*. If `searchState` was not valid or no matching keyframes are found, an empty *{Array}* is returned.

----

Export
------

```js
findRulesToCss( options, searchState )
```
<a id="findRulesToCss-api-anchor"></a>
Finds and exports rules in the internal rule collection that have a state which matches `searchState`. Each rule is exported as a *{String}* of css.

**Arguments**

`options` *{Object}*:  Used for css formatting. Valid properties are:

- `innerIndent` *{Number}*: indent within the curly brackets which hold a css property
- `rpad` *{Number}*: padding from the right of a value to a css property
- `shorthand` *{Boolean}*: if true, exports the first rule of each found rule *{Object}* in shorthand css animation form.

`searchState` *{Object}*: State to search for. Must contain valid rule state properties and values. If `searchState` is undefined, the entire rule collection is exported. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.


**Returns**

*{Array}*: Rule css; each is a *{String}*. If `searchState` was not valid or no matching rules are found, an empty *{Array}* is returned.

----

```js
findKeyframesToCss( options, searchState )
```
<a id="findKeyframesToCss-api-anchor"></a>
Finds and exports keyframes in the interanl keyframe collection that have a state which matches `searchState`. Each keyframe is exported as a *{String}* of css.

**Arguments**

`options` *{Object}*:  Used for css formatting. Valid properties are:

- `outerIndent` *{Number}*: indent at the css property name
- `innerIndent` *{Number}*: indent within the curly brackets which hold a css property
- `rpad` *{Number}*: padding from the right of a value to a css property

`searchState` *{Object}*: State to search for. Must contain valid keyframe state properties and values. If `searchState` is undefined, the entire keyframe collection is exported. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.


**Returns**

*{Array}*: Keyframe css; each is a *{String}*. If `searchState` was not valid or no matching keyframes are found, an empty *{Array}* is returned.

----

```js
findRulesToAst( searchState )
```
<a id="findRulesToAst-api-anchor"></a>
Finds and exports rules in the internal rule collection that have a state which matches `searchState`. Each rule is exported as an ast *{Object}*.

**Arguments**

`searchState` *{Object}*: State to search for. Must contain valid rule state properties and values. If `searchState` is undefined, the entire rule collection is exported. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.

**Returns**

*{Array}*: Rule ast; each is an *{Object}*. If `searchState` was not valid or no matching rules are found, an empty *{Array}* is returned.

----

```js
findKeyframesToAst( searchState )
```
<a id="findKeyframesToAst-api-anchor"></a>
Finds and exports keyframes in the internal keyframe collection that have a state which matches `searchState`. Each keyframe is exported as an ast *{Object}*.

**Arguments**

`searchState` *{Object}*: State to search for. Must contain valid keyframe state properties and values. If `searchState` is undefined, the entire keyframe collection is exported. Partial matching is used for values that are an *{Object}*. For example, if the value is an *{Array}*, there will be a match if an *{Array}* value compared from a `searchState` property contains one or more of the same items as an *{Array}* value of a corresponding rule property.

**Returns**

*{Array}*: Keyframe ast; each is an *{Object}*. If `searchState` was not valid or no matching keyframes are found, an empty *{Array}* is returned.

----

```js
rulesToCss( options, states )
```
<a id="rulesToCss-api-anchor"></a>
Exports each rule state as a *{String}* of css.

**Arguments**

`options` *{Object}*:  Used for css formatting. Valid properties are:

- `innerIndent` *{Number}*: indent within the curly brackets which hold a css property
- `rpad` *{Number}*: padding from the right of a value to a css property
- `shorthand` *{Boolean}*: if true, exports the first rule of each *{Object}* in shorthand css animation form.

`states` *{Array}*: Rule states; each is an *{Object}*. Must be a valid rule state.

**Returns**

*{Array}*: Rule css; each is a *{String}*. If `states` was not valid or contained an invalid rule state, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors.

----


```js
keyframesToCss( options, states )
```
<a id="keyframesToCss-api-anchor"></a>
Exports each keyframe state as a *{String}* of css.

**Arguments**

`options` *{Object}*:  Used for css formatting. Valid properties are:

- `outerIndent` *{Number}*: indent at the css property name
- `innerIndent` *{Number}*: indent within the curly brackets which hold a css property
- `rpad` *{Number}*: padding from the right of a value to a css property

`states` *{Array}*: Keyframe states; each is an *{Object}*. Must be a valid keyframe state.

**Returns**

*{Array}*: Keyframe css; each is a *{String}*. If `states` was not valid or contained an invalid keyframe state, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors.

-----


```js
rulesToAst( states )
```
<a id="rulesToAst-api-anchor"></a>
Exports each rule state as an ast *{Object}*.

**Arguments**

`states` *{Array}*: Rule states; each is an *{Object}*. Must be a valid rule state.

**Returns**

*{Array}*: Rule ast; each is an *{Object}*. If `states` was not valid or contained an invalid rule state, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors.

----

```js
keyframesToAst( states )
```
<a id="keyframesToAst-api-anchor"></a>
Exports each keyframe state as an ast *{Object}*.

**Arguments**

`states` *{Array}*: Keyframe states; each is an *{Object}*. Must be a valid keyframe state.

**Returns**

*{Array}*: Keyframe ast; each is an *{Object}*. If `states` was not valid or contained an invalid keyframe state, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors.

----

Rule API <a id="rule-api-anchor"></a>
============

```js
const {
    getErrors,
    getEachRule,
    getState,
    getDelay,
    getDirection,
    getDuration,
    getFillMode,
    getName,
    getPlayState,
    getTiming,
    getIterationCount,
    setState,
    setDelay,
    setDirection,
    setDuration,
    setFillMode,
    setName,
    setPlayState,
    setTiming,
    setIterationCount
} = myRule;
```

Get
------

```js
getErrors()
```
<a id="getErrors-rule-api-anchor"></a>
Returns the current errors of a rule.

**Arguments**

None.

**Returns**

*{Object|Undefined}*: If errors exist, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors. Otherwise, *{Undefined}* is returned.

----

```js
getEachRule()
```
<a id="getEachRule-api-anchor"></a>
Returns the current rule state broken into separate rule states, each with one value per property.

**Arguments**

None.

**Returns**

*{Array}*: Rule state; each is an *{Object}*. Breaks multiple animation property values each into a seperate rule state *{Object}*, for each property that has a non-empty *{Array}* value which contains a defined item. Follows the logic recommended by Mozilla for [multiple animation property values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations#Setting_multiple_animation_property_values).

----

```js
getState()
```
<a id="getState-rule-api-anchor"></a>
Returns the current state of a rule.

**Arguments**

None.

**Returns**

*{Object}*: Rule state; each is an *{Object}*. The state is deeply cloned and includes empty *{Array}* values.

----

```js
getDelay()
```
<a id="getDelay-api-anchor"></a>
Returns the current `animation-delay` of a rule.

**Arguments**

None.

**Returns**

*{Array}*: `animation-delay` values; each is a *{String}*. The state is deeply cloned and includes empty *{Array}* values.

----

```js
getDirection()
```
<a id="getDirection-api-anchor"></a>
Returns the current `animation-direction` of a rule.

**Arguments**

None.

**Returns**

*{Array}*: `animation-direction` values; each is a *{String}*. The state is deeply cloned and includes empty *{Array}* values.

----

```js
getDuration()
```
<a id="getDuration-api-anchor"></a>
Returns the current `animation-duration` of a rule.

**Arguments**

None.

**Returns**

*{Array}*: `animation-duration` values; each is a *{String}*. The state is deeply cloned and includes empty *{Array}* values.

----

```js
getFillMode()
```
<a id="getFillMode-api-anchor"></a>
Returns the current `animation-fill-mode` of a rule.

**Arguments**

None.

**Returns**

*{Array}*: `animation-fill-mode` values; each is a *{String}*. The state is deeply cloned and includes empty *{Array}* values.

----

```js
getName()
```
<a id="getName-rule-api-anchor"></a>
Returns the current `animation-name` of a rule.

**Arguments**

None.

**Returns**

*{Array}*: `animation-name` values; each is a *{String}*. The state is deeply cloned and includes empty *{Array}* values.

----

```js
getPlayState()
```
<a id="getPlayState-api-anchor"></a>
Returns the current `animation-play-state` of a rule.

**Arguments**

None.

**Returns**

*{Array}*: `animation-play-state` values; each is a *{String}*. The state is deeply cloned and includes empty *{Array}* values.

----

```js
getTiming()
```
<a id="getTiming-api-anchor"></a>
Returns the current `animation-timing-function` of a rule.

**Arguments**

None.

**Returns**

*{Array}*: `animation-timing-function` values; each is a *{String}*. The state is deeply cloned and includes empty *{Array}* values.

----

```js
getIterationCount()
```
<a id="getIterationCount-api-anchor"></a>
Returns the current `animation-iteration-count` of a rule.

**Arguments**

None.

**Returns**

*{Array}*: `animation-iteration-count` values; each is a *{String}*. The state is deeply cloned and includes empty *{Array}* values.

----

Set
----

```js
setState( state )
```
<a id="setState-rule-api-anchor"></a>
Sets the state of a rule.

**Arguments**

`state` *{Object}*: Must include at minimum a valid `animation-name` property with an *{Array}* value containing one *{String}* name.

**Returns**

*{Object|Undefined}*: If errors were present during the setting of `state`, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors. Otherwise, *{Undefined}* is returned.

----

```js
setDelay( delay )
```
<a id="setDelay-api-anchor"></a>
Sets the `animation-delay` of a rule.

**Arguments**

`delay` *{Array}*: Contains *{String}* `animation-delay` values.

**Returns**

*{Object|Undefined}*: If errors were present during the setting of `delay`, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors. Otherwise, *{Undefined}* is returned.

----

```js
setDirection( direction )
```
<a id="setDirection-api-anchor"></a>
Sets the `animation-direction` of a rule.

**Arguments**

`direction` *{Array}*: Contains *{String}* `animation-direction` values.

**Returns**

*{Object|Undefined}*: If errors were present during the setting of `direction`, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors. Otherwise, *{Undefined}* is returned.

----

```js
setDuration( duration )
```
<a id="setDuration-api-anchor"></a>
Sets the `animation-duration` of a rule.

**Arguments**

`duration` *{Array}*: Contains *{String}* `animation-duration` values.

**Returns**

*{Object|Undefined}*: If errors were present during the setting of `duration`, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors. Otherwise, *{Undefined}* is returned.

----

```js
setFillMode( fillMode )
```
<a id="setFillMode-api-anchor"></a>
Sets the `animation-fill-mode` of a rule.

**Arguments**

`fillMode` *{Array}*: Contains *{String}* `animation-fill-mode` values.

**Returns**

*{Object|Undefined}*: If errors were present during the setting of `fillMode`, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors. Otherwise, *{Undefined}* is returned.

----

```js
setName( name )
```
<a id="setName-rule-api-anchor"></a>
Sets the `animation-name` of a rule.

**Arguments**

`name` *{Array}*: Contains *{String}* `animation-name` values.

**Returns**

*{Object|Undefined}*: If errors were present during the setting of `name`, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors. Otherwise, *{Undefined}* is returned.

----

```js
setPlayState( playState )
```
<a id="setPlayState-api-anchor"></a>
Sets the `animation-play-state` of a rule.

**Arguments**

`playState` *{Array}*: Contains *{String}* `animation-play-state` values.

**Returns**

*{Object|Undefined}*: If errors were present during the setting of `playState`, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors. Otherwise, *{Undefined}* is returned.

----

```js
setTiming( timing )
```
<a id="setTiming-api-anchor"></a>
Sets the `animation-timing-function` of a rule.

**Arguments**

`timing` *{Array}*: Contains *{String}* `animation-timing-function` values.

**Returns**

*{Object|Undefined}*: If errors were present during the setting of `timing`, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors. Otherwise, *{Undefined}* is returned.

----

```js
setIterationCount( iterationCount )
```
<a id="setIterationCount-api-anchor"></a>
Sets the `animation-iteration-count` of a rule.

**Arguments**

`iterationCount` *{Array}*: Contains *{String}* `animation-iteration-count` values.

**Returns**

*{Object|Undefined}*: If errors were present during the setting of `iterationCount`, an error *{Object}* is returned which has an `error` property with an *{Array}* value containing the errors. Otherwise, *{Undefined}* is returned.
