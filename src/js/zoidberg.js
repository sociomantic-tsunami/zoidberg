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
    * @typedef  {Array}   rules
    */
    let rules = [];


    /**
    * Keyframes which belong to the current Zoidberg
    *
    * @typedef  {Array}   keyframes
    */
    let keyframes = [];


    /**
    * Creates and returns new rule. Must be initialized with a valid name.
    * If not and/or other errors are present, returns a list of error objects.
    *
    * @param {Object}           options               rule options
    *
    * @return {Object}                                errors|rule
    */
    const createRule = options =>
    {
        const rule   = Rule();
        const errors = rule.setState( options );

        if( errors ) return errors;

        rules = [ ...rules, rule];

        return rule;
    };


    /**
    * Creates and returns a new keyframe. Must be initialized with a valid name.
    * If not and/or other errors are present, returns a list of error objects.
    *
    * @param {Object}           options               keyframe options
    *
    * @return {Object}                                errors|keyframe
    */
    const createKeyframe = options =>
    {
        const keyframe = Keyframe();
        const errors   = keyframe.setState( options );

        if( errors ) return errors;

        keyframes = [ ...keyframes, keyframe];

        return keyframe;
    };


    /**
    * Finds keyframes that have a state which matches the search state.
    *
    * @param {Object}           searchState           state to search for
    *
    * @return {Array}                                 found keyframes
    */
    const findKeyframes = searchState =>
    {
        return find( searchState, keyframes );
    };


    /**
    * Finds rules that have a state which matches the search state.
    *
    * @param {Object}           searchState           state to search for
    *
    * @return {Array}                                 found rules
    */
    const findRules = searchState =>
    {
        return find( searchState, rules );
    };


    /**
    * Removes keyframes from the keyframes array.
    *
    * @param {Object}           searchState           state to search for
    *
    * @return {Array}                                 removed keyframes
    */
    const removeKeyframes = searchState =>
    {
        const { removed, remaining } = remove( searchState, keyframes );

        keyframes = remaining;

        return removed;
    };


    /**
    * Removes animation rules from the rules array.
    *
    * @param {Object}           searchState           state to search for
    *
    * @return {Array}                                 removed rules
    */
    const removeRules = searchState =>
    {
        const { removed, remaining } = remove( searchState, rules );

        rules = remaining;

        return removed;
    };


    /**
    * Exports the css of keyframes that match the search state. If search state
    * is undefined, entire collection is exported.
    *
    * @param {Object}           options               formatting options
    * @param {Object}           searchState           state of factories to search for
    *
    * @return {Array}                                 keyframes css
    */
    const findKeyframesToCss = ( options, searchState ) =>
    {
        return exportKeyframesCss( options, searchState, keyframes );
    };


    /**
    * Exports the css of rules that match the search state. If search state is
    * undefined, entire collection is exported.
    *
    * @param {Object}           options               formatting options
    * @param {Object}           searchState           state of factories to search for
    *
    * @return {Array}                                 rules css
    */
    const findRulesToCss = ( options, searchState ) =>
    {
        return exportRulesCss( options, searchState, rules );
    };


    /**
    * Exports the ast of keyframes that match the search state. If search state
    * is undefined, entire collection is exported.
    *
    * @param {Object}           searchState           state of factories to search for
    *
    * @return {Array}                                 keyframes ast
    */
    const findKeyframesToAst = searchState =>
    {
        const css = findKeyframesToCss( {}, searchState );

        return exportAst( css );
    };


    /**
    * Exports the ast of rules that match the search state. If searach state is
    * undefined, entire collection is exported. Wraps each rule css in a block
    * statement with a generic selector to allow for ast export.
    *
    * @param {Object}           searchState           state of factories to search for
    *
    * @return {Array}                                 rules ast
    */
    const findRulesToAst = searchState =>
    {
        let css = findRulesToCss( {}, searchState );
        css     = css.map( block => `.selector { ${ block } }` );

        return exportAst( css );
    };


    /**
    * Exports the css of the given keyframes. If the states to export contain
    * errors, returns an array of the error states. Otherwise, returns an array
    * of css.
    *
    * @param {Object}           options               formatting options
    * @param {Array}            states                states to export
    *
    * @return {Object|Array}                          errors|keyframes css
    */
    const keyframesToCss = ( options, states ) =>
    {
        const errors = validateCreate( Keyframe, states );

        if( errors ) return errors;

        return exportKeyframesCss( options, states );
    };


    /**
    * Exports the css of the given rules. If the states to export contain
    * errors, returns an array of the error states. Otherwise, returns an array
    * of css.
    *
    * @param {Object}           options               formatting options
    * @param {Array}            states                states to export
    *
    * @return {Object|Array}                          errors|keyframes css
    */
    const rulesToCss = ( options, states ) =>
    {
        const errors = validateCreate( Rule, states );

        if( errors ) return errors;

        return exportRulesCss( options, states );
    };


    /**
    * Exports the ast of the given keyframes. If the states to export contain
    * errors, returns an array of the error states. Otherwise, returns an array
    * of ast.
    *
    * @param {Object}           options               formatting options
    * @param {Array}            states                states to export
    *
    * @return {Object|Array}                          errors|keyframes ast
    */
    const keyframesToAst = states =>
    {
        const css = keyframesToCss( {}, states );

        if( css.errors ) return css;

        return exportAst( css );
    };


    /**
    * Exports the ast of the given rules. Wraps each rule css in a block
    * statement with a generic selector to allow for ast export. If the states
    * to export contain errors, returns an array of the error states. Otherwise,
    * returns an array of css.
    *
    * @param {Object}           options               formatting options
    * @param {Array}            states                states to export
    *
    * @return {Object|Array}                          errors|rules ast
    */
    const rulesToAst = states =>
    {
        let css = rulesToCss( {}, states );

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
        findKeyframesToAst,
        findRulesToCss,
        findRulesToAst,
        keyframesToCss,
        keyframesToAst,
        rulesToCss,
        rulesToAst
    }

}