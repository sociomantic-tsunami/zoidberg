/**
* This file is part of Zoidberg <https://github.com/sociomantic-tsunami/zoidberg/>
* Copyright (c) 2017 dunnhumby Germany GmbH.
* MIT License. See accompanying LICENSE.txt for details.
*/


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
    return css.map( block => cssHelper.parse( block ) );
}