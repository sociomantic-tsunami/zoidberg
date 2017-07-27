/**
* This file is part of Zoidberg <https://github.com/sociomantic-tsunami/zoidberg/>
* Copyright (c) 2017 sociomantic labs GmbH.
* MIT License. See accompanying LICENSE.txt for details.
*/


import isArray from 'lodash/isArray';
import padStart from 'lodash/padStart';
import padEnd from 'lodash/padEnd';


/**
* Sorts states in ascending order by their first marker. Removes states that do
* not have markers defined.
*
* @param {Object}        states                     factory states
*
* @return {Array}                                   sorted markers
*/
export const sortMarkers = states =>
{
    return [ ...states]
    .filter( state => state.markers && state.markers.length )
    .sort( ( a, b ) =>
    {
        const markerA = parseInt( a.markers[0], 10 );
        const markerB = parseInt( b.markers[0], 10 );

        return markerA - markerB;
    } );
};


/**
* Builds a css string property and value according to the formatting options.
*
* @param {String}        prop                      property name
* @param {Array|String}  val                       property value
* @param {Object}        formatOptions             css formatting options
*
* @return {String}                                 css property/value pair
*/
export const buildProperty = ( prop, val, formatOptions ) =>
{
    const { innerIndent, rpad } = formatOptions;

    if( isArray( val ) ) val = val.join( ', ' );
    if( val === '' || val === undefined ) return;

    const leftIndent = padStart( '', innerIndent );
    const property   = padEnd( prop + ':', rpad );

    return `\n${ leftIndent }${ property }${ val };`;
};