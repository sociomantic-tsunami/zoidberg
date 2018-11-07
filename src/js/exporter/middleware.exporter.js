/**
* This file is part of Zoidberg <https://github.com/sociomantic-tsunami/zoidberg/>
* Copyright (c) 2017 dunnhumby Germany GmbH.
* MIT License. See accompanying LICENSE.txt for details.
*/


import reduce from 'lodash/reduce';
import { find } from 'helper/zoidberg.helper';
import { validate } from 'util/validator.js';


/**
* Default format options used for css formatting.
*
* @typedef {Object}         defaultFormatOptions
* @property {Number}        options.outerIndent   top-level indent
* @property {Number}        options.innerIndent   nested indent
* @property {Number}        options.rpad          rpad between property and value
* @property {Boolean}       options.shorthand     shorthand version, if it exists
*/
const defaultFormatOptions =
{
    outerIndent : 4,
    innerIndent : 8,
    rpad        : 28,
    shorthand   : false
};


/**
* Validates user-defined css formatting options. Replaces invalid or missing
* options with defaultFormatOptions.
*
* @param {Object}           formatOptions         css formatting options
*
* @return {Object}                                css formatting options
*/
const getFormatOptions = ( formatOptions = {} ) =>
{
    if( ! validate( 'options', formatOptions ) ) return defaultFormatOptions;

    return reduce( defaultFormatOptions, ( acc, value, prop ) =>
    {
        const valid = validate( prop, formatOptions[prop] );
        acc[prop]   = valid ? formatOptions[prop] : defaultFormatOptions[prop];

        return acc;
    }, {} );
};


/**
* Determines which factories to export. If state is falsy, every factory
* in the collection will be exported. Gets the states of the factories for export.
*
* @param {Object}            searchState           state to search for
* @param {Object}            formatOptions         css formatting options
* @param {CallbackFn}        exporter              exporter callback
* @param {Object}            collection            factory collection
*
* @return {Array}                                  exported
*/
const findToExport = ( searchState, formatOptions, exporter, collection ) =>
{
    const factories = ! searchState ? collection : find( searchState, collection );
    const states    = factories.map( factory => factory.getState() );

    return exporter( states, formatOptions );
};


/**
* Exporter middleware.
*
* @param {Array|Object}     state                 states to export|search state
* @param {Object}           formatOptions         css formatting options
* @param {CallbackFn}       exporter              exporter callback
* @param {Array}            collection            factory collection
*
* @return {Array}                                 css
*/
export default ( state, formatOptions, exporter, collection ) =>
{
    const options = getFormatOptions( formatOptions );

    if( collection )
    {
        return findToExport( state, options, exporter, collection );
    }

    return exporter( state, options );
};