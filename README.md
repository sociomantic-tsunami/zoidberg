Description
===========

Vanilla JavaScript CSS animation engine.

A Zoidberg creates and stores animation rule and keyframe objects. Once stored,
animation rule and keyframe objects can be retrieved, edited, removed and exported.
Zoidberg currently supports exporting in ast or css format. Css format offers some configurable
text formatting.

Zoidberg supports [multiple animation property values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations#Setting_multiple_animation_property_values).


Installation
============

1. Run `npm i` or `yarn`.
2. Run `npm run compile` to compile Zoidberg to `dist/zoidberg.js`.
3. Run `npm run watch` to compile and watch


Testing
============

Run `npm run test`. Tests run via a webpack dev server and can be viewed in
the browser at http://localhost:8080/test/test.html


Demo
===========

Run `npm run demo`. Demo runs via a Python SimpleHTTPServer and will automatically
open a browser window at http://localhost:8000/demo/ . It may be required to refresh
the demo page once the server is created.


Usage
============

```js
// npm
require( 'zoidberg' );

// es6
import <<module name of your choice>> from 'zoidberg';
```

As an example, if the following module name is chosen

```js
import zoidberg from 'zoidberg';
```

A new Zoidberg would be created via

```js
const myZoidberg = zoidberg();
```

Creating a Zoidberg **does not** require the `new` keyword. A Zoidberg is not a `class`, it is simply a function which follows the factory pattern.


API Documentation
=============

Can be found [here](api.md).


Change Log
============

Can be found [here](changelog.md).


Code of Conduct
===============

This project adheres to the [Berlin Code of Conduct](http://berlincodeofconduct.org/). By participating in the development of Zoidberg, this code is expected to be honoured.

Pull-requests into the `dev` branch are gladly reviewed and accepted.

Dependencies
============
- [Lodash](https://github.com/lodash)
- [Babel](https://github.com/babel/babel)
- [Mocha](https://github.com/mochajs/mocha)
- [Chai](https://github.com/chaijs/chai)
- [Sinon](https://github.com/sinonjs/sinon)
- [Webpack](https://github.com/webpack/webpack)
