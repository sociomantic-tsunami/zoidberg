import cssHelper from 'css';


/**
* Exports the css of factories to AST.
*
* @param {Array}            css                     factory css
*
* @return {Array}                                   css exported to AST
*/
export default function exportAst ( css )
{
    return css.map( block =>
    {
        return cssHelper.parse( block );
    } );
}