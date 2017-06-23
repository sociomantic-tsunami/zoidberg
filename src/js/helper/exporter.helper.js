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
* Builds a CSS string property according to formatting.
*
* @param {String}        prop                      property name
* @param {Array|String}  val                       property value
* @param {Object}        options                   formatting options
*
* @return {String}                                 CSS property value pair
*/
export const buildProperty = ( prop, val, options ) =>
{
    const { innerIndent, rpad } = options;

    if( isArray( val ) ) val = val.join( ', ' );
    if( val === '' || val === undefined ) return;

    const leftIndent = padStart( '', innerIndent );
    const property   = padEnd( prop + ':', rpad );

    return `\n${ leftIndent }${ property }${ val };`;
};