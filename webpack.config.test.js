const path    = require( 'path' );
const resolve = relative => path.join( __dirname, relative );

module.exports =
{
    devtool : 'source-map',
    entry   : resolve( '/test/runner.js' ),
    output  :
    {
        path     : resolve( '/test' ),
        filename : 'test.js'
    },
    externals :
    {
        'chai'  : 'chai',
        'mocha' : 'mocha',
        'sinon' : 'sinon'
    },
    resolve :
    {
        modules :
        [
            resolve( 'src/js' ),
            resolve( 'node_modules' )
        ]
    },
    module :
    {
        loaders :
        [
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                exclude :
                [
                    resolve( 'node_modules' )
                ],
                query  :
                {
                    presets : ['es2015'],
                    plugins : ['transform-object-rest-spread']
                }
            }
        ]
    },
    devServer :
    {
        // Shows a full screen overlay with any webpack errors instead of the test page
        overlay : true
    }
}