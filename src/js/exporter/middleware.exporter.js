import reduce from 'lodash/reduce';
import { find } from 'helper/zoidberg.helper';
import { validate } from 'util/validator.js';


/**
* Default middleware options used for css formatting.
*
* @typedef {Object}         middlewareOptions
* @property {Number}        options.outerIndent   top-level indent
* @property {Number}        options.innerIndent   nested indent
* @property {Number}        options.rpad          rpad between property and value
* @property {Boolean}       options.shorthand     shorthand version, if it exists
*/
const middlewareOptions =
{
    outerIndent : 4,
    innerIndent : 8,
    rpad        : 28,
    shorthand   : false
};


/**
* Validates user-defined css formatting options. Replaces invalid or missing
* options with middlewareOptions.
*
* @param {Object}           options               css formatting options
*
* @return {Object}                                css formatting options
*/
const getFormatOptions = ( options = {} ) =>
{
    if( ! validate( 'options', options ) ) return middlewareOptions;

    return reduce( middlewareOptions, ( acc, value, prop ) =>
    {
        const valid = validate( prop, options[prop] );
        acc[prop]   = valid ? options[prop] : middlewareOptions[prop];

        return acc;
    }, {} );
};


/**
* Determines which factories to export. If state is undefined, every
* factory in the collection will be exported. Gets the states of the factories
* for export.
*
* @param {Object}            options               css formatting options
* @param {Object}            searchState           state of factories to search for
* @param {CallbackFn}        exporter              exporter callback
* @param {Object}            collection            factory collection
*
* @return {Array}                                  exported
*/
const findToExport = ( options, searchState, exporter, collection ) =>
{
    const factories = searchState === void 0 ? collection : find( searchState, collection );
    const states    = factories.map( factory => factory.getState() );

    return exporter( options, states );
};


/**
* Exporter middleware.
*
* @param {Object}           formatOptions         css formatting options
* @param {Array|Object}     state                 search state or states to export
* @param {CallbackFn}       exporter              exporter callback
* @param {Array}            collection            factory collection
*
* @return {Array}                                 css
*/
export default ( formatOptions, state, exporter, collection ) =>
{
    const options = getFormatOptions( formatOptions );

    if( collection )
    {
        return findToExport( options, state, exporter, collection );
    }

    return exporter( options, state );
};