const webpack      = require( 'webpack' );
const webpackMerge = require( 'webpack-merge' );
const commonConfig = require( './webpack.config.js' );

const path    = require( 'path' );
const resolve = relative => path.join( __dirname, relative );

module.exports = webpackMerge( commonConfig,
{
    entry     : resolve( '../test/runner.js' ),
    externals :
    {
        'chai'  : 'chai',
        'mocha' : 'mocha',
        'sinon' : 'sinon'
    },
    devServer :
    {
        // Shows a full screen overlay with any webpack errors instead of the test page
        overlay : true
    }
}