import forOwn from 'lodash/forOwn';
import { shorthandRuleOrder } from 'constant/exporter.constant';
import exporterMiddleware from 'exporter/middleware.exporter';
import { buildProperty } from 'helper/exporter.helper';


/**
* Rules CSS exporter.
*
* @param {Object}           states                 Rule states to export
* @param {Object}           formatOptions          css formatting options
* @property {Number}        options.outerIndent    top-level indent
* @property {Number}        options.innerIndent    nested indent
* @property {Number}        options.rpad           rpad between property and value
* @property {Boolean}       options.shorthand      shorthand version, if it exists
*
* @return {Array}                                   css
*/
const exporter = ( states, formatOptions ) =>
{

    /**
    * Builds a shorthand css animation rule using the first value of each property.
    * Omits property values that are empty arrays.
    *
    * @return {Array}                               shorthand animation rule css
    */
    const buildShorthandRule = () =>
    {
        return states.map( rule =>
        {
            const properties = shorthandRuleOrder.reduce( ( acc, prop ) =>
            {
                const value = rule[prop][0];

                if( value !== void 0 ) acc.push( value );

                return acc;
            }, [] );

            return properties.join( ' ' );
        } );
    };


    /**
    * Builds a multiple css animation rule, separating each value of a property
    * by a comma.
    *
    * @return {Array}                               blocks of animation rule css
    */
    const buildMultipleRules = () =>
    {
        return states.map( rule =>
        {
            let properties = '';

            forOwn( rule, ( val, prop ) =>
            {
                let builtProperty = buildProperty( prop, val, formatOptions );

                if( builtProperty ) properties += builtProperty;
            } );

            return `${ properties }\n`;
        } );
    }


    return formatOptions.shorthand ? buildShorthandRule() : buildMultipleRules();
};

export default ( state, formatOptions, collection ) => exporterMiddleware( state, formatOptions, exporter, collection );