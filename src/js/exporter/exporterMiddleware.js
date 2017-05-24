import { find } from 'helper/zoidberg.helper';
import { validate } from 'util/validator.js'


/**
* Default format options
*
* @typedef {Object}         options
* @property {Number}        options.outerIndent   top-level indent
* @property {Number}        options.innerIndent   nested indent
* @property {Number}        options.colon         space between colon and property
* @property {Number}        options.rpad          rpad between property and value
*/
const formatDefaults =
{
    outerIndent : 4,
    innerIndent : 8,
    colon       : 0,
    rpad        : 24
};


/**
* Validates formatting rules for exports. Replaces invalid or missing format
* options with defaults.
*
* @return {Object}       options                   formatting rules
*/
const getFormatRules = ( options = {} ) =>
{
    const format = {};

    for( let prop in formatDefaults )
    {
        let valid    = validate( prop, options[prop] );
        format[prop] = valid ? options[prop] : formatDefaults[prop];
    }

    return format;
};


/**
* Exporter middleware. Determines the factories to be exported. If state is
* undefined, every factory in the collection will be exported. Passes the states
* of the export factories and formatting rules to the exporter.
*
* @param {Object}            options               rules for formatting
* @param {Object}            state                 state of factor to export
* @param {Object}            collection            collection of factories
* @param {CallbackFn}        exporter              exporter callback
*
* @return {Array}                                  export
*/
export default function exporterMiddleware ( options, state, collection, exporter )
{
    const factories = state === void 0 ? collection : find( state, collection );
    const states    = factories.map( factory => factory.getState() );
    const format    = getFormatRules( options );

    return exporter( states, format );
}