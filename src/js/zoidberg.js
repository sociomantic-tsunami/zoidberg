/**
* This file is part of Zoidberg <https://github.com/sociomantic-tsunami/zoidberg/>
* Copyright (c) 2017 dunnhumby Germany GmbH.
* MIT License. See accompanying LICENSE.txt for details.
*/


import isMatch from 'lodash/isMatch';
import isEmpty from 'lodash/isEmpty';
import Rule from 'factory/rule';
import Keyframe from 'factory/keyframe';
import exportKeyframesCss from 'exporter/keyframe.css.exporter';
import exportRulesCss from 'exporter/rule.css.exporter';
import exportAst from 'exporter/ast.exporter';
import { find, remove } from 'helper/zoidberg.helper';
import { validateCreate } from 'util/validator';


export default () =>
{

    /**
    * Rules which belong to the current Zoidberg
    *
    * @typedef  {Array}         Rules collection
    */
    let rules = [];


    /**
    * Keyframes which belong to the current Zoidberg
    *
    * @typedef  {Array}         Keyframes collection
    */
    let keyframes = [];


    /**
    * Creates and returns a Rule. Must be initialized with a valid name.
    * If not and/or other errors are present, returns an Error.
    *
    * @param {Object}           initialState          initial state of a Rule
    *
    * @return {Error|Rule}                            Error|Rule
    */
    const createRule = initialState =>
    {
        const rule   = Rule();
        const errors = rule.setState( initialState );

        if( errors ) return errors;

        rules = [ ...rules, rule];

        return rule;
    };


    /**
    * Creates and returns a Keyframe. Must be initialized with a valid name.
    * If not and/or other errors are present, returns an Error.
    *
    * @param {Object}           initialState          initial state of a Keyframe
    *
    * @return {Error|Keyframe}                        Error|Keyframe
    */
    const createKeyframe = initialState =>
    {
        const keyframe = Keyframe();
        const errors   = keyframe.setState( initialState );

        if( errors ) return errors;

        keyframes = [ ...keyframes, keyframe];

        return keyframe;
    };


    /**
    * Finds Keyframe states which match searchState. If searchState is falsy
    * (ie. undefined), the entire Keyframe collection is returned.
    *
    * @param {Object}           searchState           Keyframe state to search for
    *
    * @return {Array}                                 found Keyframes
    */
    const findKeyframes = searchState =>
    {
        return find( searchState, keyframes );
    };


    /**
    * Finds Rule states that match the searchState. If searchState is falsy
    * (ie. undefined), the  entire Rule collection is returned.
    *
    * @param {Object}           searchState           Rule state to search for
    *
    * @return {Array}                                 found Rules
    */
    const findRules = searchState =>
    {
        return find( searchState, rules );
    };


    /**
    * Removes Keyframes from the Keyframes collection. If searchState is falsy
    * (ie. undefined), the entire Keyframe collection is emptied and returned.
    *
    * @param {Object}           searchState           Keyframe state to search for
    *
    * @return {Array}                                 states of removed Keyframes
    */
    const removeKeyframes = searchState =>
    {
        const { removed, remaining } = remove( searchState, keyframes );

        keyframes = remaining;

        return removed;
    };


    /**
    * Removes Rules from the Rules collection. If searchState is falsy
    * (ie. undefined), the entire Rule collection is emptied and returned.
    *
    * @param {Object}           searchState           Rule state to search for
    *
    * @return {Array}                                 states of removed Rules
    */
    const removeRules = searchState =>
    {
        const { removed, remaining } = remove( searchState, rules );

        rules = remaining;

        return removed;
    };


    /**
    * Exports the css of Keyframes that have a state that matches searchState.
    * If searchState is falsy (ie. undefined), the entire Keyframe collection is
    * exported.
    *
    * @param {Object}           searchState           Keyframe state to search for
    * @param {Object}           formatOptions         css formatting options
    *
    * @return {Array}                                 Keyframe css
    */
    const findKeyframesToCss = ( searchState, formatOptions ) =>
    {
        return exportKeyframesCss( searchState, formatOptions, keyframes );
    };


    /**
    * Exports the css of Rules that have a state that matches the searchState.
    * If searchState is falsy (ie. undefined), the entire Rule collection is
    * exported.
    *
    * @param {Object}           searchState           Rule state to search for
    * @param {Object}           formatOptions         css formatting options
    *
    * @return {Array}                                 Rule css
    */
    const findRulesToCss = ( searchState, formatOptions ) =>
    {
        return exportRulesCss( searchState, formatOptions, rules );
    };


    /**
    * Exports the ast of Keyframes that have a state that matches the searchState.
    * If searchState is falsy (ie. undefined), the entire Keyframe collection is
    * exported.
    *
    * @param {Object}           searchState           Keyframe state to search for
    *
    * @return {Array}                                 Keyframe ast
    */
    const findKeyframesToAst = searchState =>
    {
        const css = findKeyframesToCss( searchState );

        return exportAst( css );
    };


    /**
    * Exports the ast of Rules that have a state that matches the searchState.
    * If searchState is falsy (ie. undefined), the entire Rule collection is
    * exported. Wraps each Rule css in a block statement with a generic selector
    * to allow for ast export.
    *
    * @param {Object}           searchState           Rule state to search for
    *
    * @return {Array}                                 Rule ast
    */
    const findRulesToAst = searchState =>
    {
        let css = findRulesToCss( searchState );
        css     = css.map( block => `.selector { ${ block } }` );

        return exportAst( css );
    };


    /**
    * Exports the css of the given Keyframes. If the states to export contain
    * errors, returns an Error. Otherwise, returns an array of css strings.
    *
    * @param {Array}            states                Keyframe states to export
    * @param {Object}           formatOptions         css formatting options
    *
    * @return {Error|Array}                           Error|Keyframe css
    */
    const keyframesToCss = ( states, formatOptions ) =>
    {
        const errors = validateCreate( Keyframe, states );

        if( errors ) return errors;

        return exportKeyframesCss( states, formatOptions );
    };


    /**
    * Exports the css of the given Rules. If the states to export contain
    * errors, returns an Error. Otherwise, returns an array of css strings.
    *
    * @param {Array}            states                Rule states to export
    * @param {Object}           formatOptions         css formatting options
    *
    * @return {Error|Array}                           Error|Rule css
    */
    const rulesToCss = ( states, formatOptions ) =>
    {
        const errors = validateCreate( Rule, states );

        if( errors ) return errors;

        return exportRulesCss( states, formatOptions );
    };


    /**
    * Exports the ast of the given Keyframes. If the states to export contain
    * errors, returns an Error. Otherwise, returns an array of ast objects.
    *
    * @param {Array}            states                Keyframe states to export
    *
    * @return {Error|Array}                           Error|Keyframe ast
    */
    const keyframesToAst = states =>
    {
        const css = keyframesToCss( states );

        if( css.errors ) return css;

        return exportAst( css );
    };


    /**
    * Exports the ast of the given Rules. Wraps each rule css in a block
    * statement with a generic selector to allow for ast export. If the states
    * to export contain errors, returns an Errors. Otherwise, returns an array
    * of ast objects.
    *
    * @param {Array}            states                Rule states to export
    *
    * @return {Error|Array}                           Error|Rule ast
    */
    const rulesToAst = states =>
    {
        let css = rulesToCss( states );

        if( css.errors ) return css;

        css = css.map( block => `.selector { ${ block } }` );

        return exportAst( css );
    };


    return {
        createRule,
        createKeyframe,
        findRules,
        findKeyframes,
        removeKeyframes,
        removeRules,
        findKeyframesToCss,
        findRulesToCss,
        findKeyframesToAst,
        findRulesToAst,
        keyframesToCss,
        rulesToCss,
        keyframesToAst,
        rulesToAst
    }

}