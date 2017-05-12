import isMatch from 'lodash/isMatch';
import isEmpty from 'lodash/isEmpty';
import Rule from 'factory/rule';
import Keyframe from 'factory/keyframe';
import { find } from 'helper/zoidberg.helper';


export default function Zoidberg()
{

    /**
    * Rules which belong to the current Zoidberg
    *
    * @typedef  {Array}   rules
    */
    const rules = [];


    /**
    * Keyframes which belong to the current Zoidberg
    *
    * @typedef  {Array}   keyframes
    */
    const keyframes = [];


    /**
    * Creates a new rule. Must be initialized with a valid name. If not and/or
    * other errors are present, returns a list of error objects. Otherwise,
    * returns undefined.
    *
    * @param {Object}           options               rule options
    *
    * @return {Array|Object}                          errors, if they exist or the rule
    */
    const createRule = options =>
    {
        const rule = Rule( options );

        rules = [ ...rules, rule];

        return rule;
    };


    /**
    * Creates a new keyframe. Must be initialized with a valid name. If not
    * and/or other errors are present, returns a list of error objects. Otherwise,
    * returns undefined.
    *
    * @param {Object}           options               keyframe options
    *
    * @return {Array|Object}                          errors, if they exist or the keyframe
    */
    const createKeyframe = options =>
    {
        const keyframe = Keyframe( options );

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


    return {
        createRule,
        createKeyframe,
        findRules,
        findKeyframes
    }

}