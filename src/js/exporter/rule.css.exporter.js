import forOwn from 'lodash/forOwn';
import { shorthandRuleOrder } from 'constant/exporter.constant';
import exporterMiddleware from 'exporter/middleware.exporter';
import { buildProperty } from 'helper/exporter.helper';


/**
* Rules CSS exporter.
*
* @param {Object}           options                css formatting options
* @property {Number}        options.outerIndent    top-level indent
* @property {Number}        options.innerIndent    nested indent
* @property {Number}        options.rpad           rpad between property and value
* @property {Boolean}       options.shorthand      shorthand version, if it exists
* @param {Object}           states                 states of factories to export
*
* @return {Array}                                   css
*/
const exporter = ( options, states ) =>
{

    /**
    * Builds a shorthand rule using the first value of each property. Omits
    * property values that are empty.
    *
    * @return {Array}                               shorthand rule css
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
    * Builds a multiple rule, separating each value of a property by a comma.
    *
    * @return {Array}                               blocks of rule css
    */
    const buildMultipleRules = () =>
    {
        return states.map( rule =>
        {
            let properties = '';

            forOwn( rule, ( val, prop ) =>
            {
                let builtProperty = buildProperty( prop, val, options );

                if( builtProperty ) properties += builtProperty;
            } );

            return `${ properties }\n`;
        } );
    }


    return options.shorthand ? buildShorthandRule() : buildMultipleRules();
};

export default ( options, state, collection ) => exporterMiddleware( options, state, exporter, collection );