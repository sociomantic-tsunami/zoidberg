import isMatch from 'lodash/isMatch';
import isEmpty from 'lodash/isEmpty';
import Rule from 'factory/rule';
import Keyframe from 'factory/keyframe';
import exportKeyframesCss from 'exporter/keyframesCss.exporter';
import exportRulesCss from 'exporter/rulesCss.exporter';
import exportAst from 'exporter/ast.exporter';
import { find, remove } from 'helper/zoidberg.helper';


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

        if( errors ) return { errors };

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

        if( errors ) return { errors };

        keyframes = [ ...keyframes, keyframe];

        return keyframe;
    };


    /**
    * Finds keyframes that have a state which matches the passed state.
    *
    * @param {Object}           state                 state to compare
    *
    * @return {Array}                                 found keyframes
    */
    const findKeyframes = state =>
    {
        return find( state, keyframes );
    };


    /**
    * Finds rules that have a state which matches the passed state.
    *
    * @param {Object}           state                 state to compare
    *
    * @return {Array}                                 found rules
    */
    const findRules = state =>
    {
        return find( state, rules );
    };


    /**
    * Removes keyframes from the keyframes array.
    *
    * @param {Object}           state                 state to compare
    *
    * @return {Array}                                 removed keyframes
    */
    const removeKeyframes = state =>
    {
        const { removed, remaining } = remove( state, keyframes );

        keyframes = remaining;

        return removed;
    };


    /**
    * Removes animation rules from the rules array.
    *
    * @param {Object}           state                 state to compare
    *
    * @return {Array}                                 removed rules
    */
    const removeRules = state =>
    {
        const { removed, remaining } = remove( state, rules );

        rules = remaining;

        return removed;
    };


    /**
    * Exports the css of keyframes that match the state. If state is undefined,
    * entire collection is exported.
    *
    * @param {Object}           options               rules for formatting
    * @param {Object}           state                 state of factories to export
    *
    * @return {Array}                                 keyframes css
    */
    const keyframesToCss = ( options, state ) =>
    {
        return exportKeyframesCss( options, state, keyframes );
    };


    /**
    * Exports the ast of keyframes that match the state. If state is undefined,
    * entire collection is exported.
    *
    * @param {Object}           state                 state of factories to export
    *
    * @return {Array}                                 keyframes ast
    */
    const keyframesToAst = state =>
    {
        const css = exportKeyframesCss( {}, state, keyframes );

        return exportAst( css );
    };


    /**
    * Exports the css of rules that match the state. If state is undefined,
    * entire collection is exported.
    *
    * @param {Object}           options               rules for formatting
    * @param {Object}           state                 state of factories to export
    *
    * @return {Array}                                 rules css
    */
    const rulesToCss = ( options, state ) =>
    {
        return exportRulesCss( options, state, rules );
    };


    /**
    * Exports the ast of rules that match the state. If state is undefined,
    * entire collection is exported. Wraps each rule css in a block statement
    * with a generic selector to allow for ast export.
    *
    * @param {Object}           state                 state of factories to export
    *
    * @return {Array}                                 rules ast
    */
    const rulesToAst = state =>
    {
        let css = exportRulesCss( {}, state, rules );
        css     = css.map( block => `.selector { ${ block } }` );

        return exportAst( css );
    };


    return {
        createRule,
        createKeyframe,
        findRules,
        findKeyframes,
        removeKeyframes,
        removeRules,
        keyframesToCss,
        keyframesToAst,
        rulesToCss,
        rulesToAst
    }

}