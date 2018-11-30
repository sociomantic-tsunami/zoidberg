/**
* This file is part of Zoidberg <https://github.com/sociomantic-tsunami/zoidberg/>
* Copyright (c) 2017 dunnhumby Germany GmbH.
* MIT License. See accompanying LICENSE.txt for details.
*/


import groupBy from 'lodash/groupBy';
import padStart from 'lodash/padStart';
import map from 'lodash/map';
import forOwn from 'lodash/forOwn';
import exporterMiddleware from 'exporter/middleware.exporter';
import { sortMarkers, buildProperty } from 'helper/exporter.helper';


/**
* Keyframes CSS exporter.
*
* @param {Array}            states                  Keyframe states to export
* @param {Object}           formatOptions           css formatting options
* @property {Number}        options.outerIndent     top-level indent
* @property {Number}        options.innerIndent     nested indent
* @property {Number}        options.rpad            rpad between property and value
* @property {Boolean}       options.shorthand       shorthand version, if it exists
*
* @return {Array}                                   css
*/
const exporter = ( states, formatOptions ) =>
{

    /**
    * Builds an @keyframe css rule.
    *
    * @param {Object}         group                  Keyframe states grouped by name
    * @param {String}         name                   name of Keyframe
    *
    * @return {String}                               @keyframe css rules
    */
    const buildKeyframe = ( group, name ) =>
    {
        let atRule = `\n@keyframes ${ name } {`;

        sortMarkers( group ).forEach( state =>
        {
            atRule += buildMarkerBlock( state );
        } );

        return atRule += `\n}`;
    };


    /**
    * Builds a marker block statement with properties, if any.
    *
    * @param {Object}      state                     Keyframe state
    *
    * @return {String}                               marker block
    */
    const buildMarkerBlock = state =>
    {
        const { markers, props } = state;
        const leftIndent = padStart( '', formatOptions.outerIndent );

        let property = `\n${ leftIndent }${ markers.join( ', ' ) } {`;

        forOwn( props, ( val, prop ) =>
        {
            let builtProperty = buildProperty( prop, val, formatOptions );

            if( builtProperty ) property += builtProperty;
        } );

        return property += `\n${ leftIndent }}`;
    };


    return map( groupBy( states, 'name' ), ( group, name ) => buildKeyframe( group, name ) );
};

export default ( state, formatOptions, collection ) => exporterMiddleware( state, formatOptions, exporter, collection );