import { ruleSetter, ruleGetter, ruleMap } from 'constant/factory.constant';
import { addSetters, addGetters, getStateHelper, setStateHelper } from 'helper/factory.helper';
import Factory from 'factory/factory';


/**
* Rule State
*
* Returns a new animation rule state.
*
* @return   {Object}                                       rule state
* @property {Array}    state['animation-delay']            when the animation should start
* @property {Array}    state['animation-direction']        cycles in which the animation should play
* @property {Array}    state['animation-duration']         time to complete one animation cycle
* @property {Array}    state['animation-fill-mode']        styles applied to target before and after execution
* @property {Array}    state['animation-iteration-count']  number of times animation should cycle
* @property {Array}    state['animation-name']             animation name
* @property {Array}    state['animation-play-state']       whether animation is playing, paused or running
* @property {Array}    state['animation-timing-function']  timing of start and end of animation
* @property {Array}    state['errors']                     validation errors
*/
const RuleState = () =>
{
    return {
        'animation-delay'           : [],
        'animation-direction'       : [],
        'animation-duration'        : [],
        'animation-fill-mode'       : [],
        'animation-iteration-count' : [],
        'animation-name'            : [],
        'animation-play-state'      : [],
        'animation-timing-function' : [],
        errors : []
    }
};


/**
* Animation Rule Factory
*
* Creates a new animation rule object. A animation rule stores information about
* the animations general settings.
*
* @param {callbackFn}      set              set callback
* @param {callbackFn}      get              get callback
* @param {callbackFn}      valid            validation callback
*
* @return {Object}                          animation rule
*/
const RuleFactory = function ( set, get, valid, getErrors )
{

    /**
    * Generic set methods for the rule factory state
    *
    * @typedef  {Object}   getters
    */
    const getters = addGetters( ruleMap, ruleGetter, get );


    /**
    * Generic set methods for the rule factory state
    *
    * @typedef  {Object}   setters
    */
    const setters = addSetters( ruleMap, ruleSetter, set, valid, getErrors );


    /**
    * Gets the state of the current rule
    *
    * @return {Object}                         state
    */
    const getState = () => getStateHelper( ruleMap, getters );


    /**
    * Sets the state of the current rule given the passed options
    *
    * @return {Array|undefined}                errors|undefined
    */
    const setState = options => setStateHelper( ruleMap, setters, getErrors, options );


    return {
        getErrors,
        getState,
        setState,
        ...getters,
        ...setters
    }

};

export default () => Factory( RuleState(), RuleFactory );