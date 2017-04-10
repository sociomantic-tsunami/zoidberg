const path    = require( 'path' );
const resolve = relative => path.join( __dirname, relative );

module.exports =
{
    entry  : resolve( '../src/index.js' ),
    output :
    {
        path          : resolve( '../dist' ),
        filename      : 'zoidberg.js',
        library       : 'zoidberg',
        libraryTarget : 'umd'
    },
    module :
    {
        loaders : [ {
            test   : /.js$/,
            loader : 'babel-loader'
        } ]
    }
};