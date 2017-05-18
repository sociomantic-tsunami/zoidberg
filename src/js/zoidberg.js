import isMatch from 'lodash/isMatch';
import isEmpty from 'lodash/isEmpty';
import Rule from 'factory/rule';
import Keyframe from 'factory/keyframe';
import { find } from 'helper/zoidberg.helper';


export default function()
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
    * Deletes keyframes from the keyframes array.
    *
    * @param {Object}           state                 state to compare
    *
    * @return {Number}                                number of keyframes deleted
    */
    const deleteKeyframes = state =>
    {
        const length = keyframes.length;
        const found  = find( state, keyframes );

        keyframes = keyframes.filter( keyframe =>
        {
            if( ! found.includes( keyframe ) ) return keyframe;
        } );

        return length - keyframes.length;
    };


    return {
        createRule,
        createKeyframe,
        findRules,
        findKeyframes,
        deleteKeyframes
    }

}