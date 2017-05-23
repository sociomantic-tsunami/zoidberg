import groupBy from 'lodash/groupBy';
import padStart from 'lodash/padStart';
import exporterMiddleware from 'exporter/exporterMiddleware';
import { sortMarkers, buildProperty } from 'helper/exporter.helper';


/**
* Exports the state of keyframe factories to CSS.
*
* @param {Object}            states                 states of factories to export
* @param {Object}            format                 format settings
*
* @return {Array}                                   CSS
*/
const exportKeyframesCss = ( states, format ) =>
{

    /**
    * Builds an @keyframe css rule.
    *
    * @param {String}         name                   name of keyframe
    *
    * @return {String}                               keyframe
    */
    const buildKeyframe = ( name, groupedStates ) =>
    {
        let atRule = `@keyframes ${ name } {\n`;

        sortMarkers( groupedStates ).forEach( state =>
        {
            atRule += buildMarkerBlock( state );
        } );

        return atRule += `}\n`;
    };


    /**
    * Builds a marker block statement with properties, if any.
    *
    * @param {Object}      state                     state of factory
    *
    * @return {String}                               marker block
    */
    const buildMarkerBlock = state =>
    {
        const { markers, props } = state;
        const leftIndent = padStart( '', format.outerIndent );
        const joinedMarkers = markers.join( ', ' );

        let property = `${ leftIndent }${ joinedMarkers } {\n`;

        for( let prop in props )
        {
            property += buildProperty( prop, props[prop], format );
        }

        return property += `${ leftIndent }}\n`;
    };


    const css    = [];
    const groups = groupBy( states, 'name' );

    for( let name in groups )
    {
        css.push( buildKeyframe( name, groups[name] ) );
    }

    return css;
};

export default ( options, state, keyframes ) => exporterMiddleware( options, state, keyframes, exportKeyframesCss );