// require all the test specs
var req = require.context("./specs", true, /.+spec\.js$/ );

req.keys().forEach( function( key )
{
    req( key );
} );

const runner = window.mochaPhantomJS || mocha;

runner.run();
