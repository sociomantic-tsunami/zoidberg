import groupBy from 'lodash/groupBy';
import padStart from 'lodash/padStart';
import map from 'lodash/map';
import forOwn from 'lodash/forOwn';
import exporterMiddleware from 'exporter/middleware.exporter';
import { sortMarkers, buildProperty } from 'helper/exporter.helper';


/**
* Keyframes CSS exporter.
*
* @param {Object}            options                rules for formatting
* @param {Array}             states                 states of factories to export
*
* @return {Array}                                   css
*/
const exporter = ( options, states ) =>
{

    /**
    * Builds an @keyframe css rule.
    *
    * @param {String}         name                   name of keyframe
    * @param {Object}         group                  factory states grouped by name
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
    * @param {Object}      state                     state of factory
    *
    * @return {String}                               marker block
    */
    const buildMarkerBlock = state =>
    {
        const { markers, props } = state;
        const leftIndent = padStart( '', options.outerIndent );

        let property = `\n${ leftIndent }${ markers.join( ', ' ) } {`;

        forOwn( props, ( val, prop ) =>
        {
            let builtProperty = buildProperty( prop, val, options );

            if( builtProperty ) property += builtProperty;
        } );

        return property += `\n${ leftIndent }}`;
    };


    return map( groupBy( states, 'name' ), ( group, name ) => buildKeyframe( group, name ) );
};

export default ( options, state, collection ) => exporterMiddleware( options, state, exporter, collection );