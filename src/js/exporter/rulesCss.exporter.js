import exporterMiddleware from 'exporter/exporterMiddleware';
import { buildProperty } from 'helper/exporter.helper';


/**
* Exports the state of rule factories to CSS.
*
* @param {Object}            states                 states of factories to export
* @param {Object}            format                 format settings
*
* @return {Array}                                   CSS
*/
const exportRulesCss = ( states, format ) =>
{
    return states.map( rule =>
    {
        let properties = '';

        for( let prop in rule )
        {
            let builtProperty = buildProperty( prop, rule[prop], format );

            if( builtProperty ) properties += builtProperty;
        };

        return `${ properties }\n`;
    } );
};

export default ( options, state, rules ) => exporterMiddleware( options, state, rules, exportRulesCss );