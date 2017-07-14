import Factory from 'factory/factory';
import ErrorHandler from 'factory/errorHandler';
import reduce  from 'lodash/reduce';
import { ruleSetter, ruleGetter, ruleMap } from 'constant/factory.constant';
import { addSetters, addGetters, getStateHelper, setStateHelper, valueAtIndex } from 'helper/factory.helper';


/**
* Rule State
*
* Returns a Rule state.
*
* @return   {Object}                                       Rule state
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
        errorHandler                : ErrorHandler()
    }
};


/**
* Rule Factory
*
* Creates a Rule. A Rule stores information about the general settings
* of a css animation.
*
* @param {callbackFn}           set                   set callback
* @param {callbackFn}           get                   get callback
* @param {callbackFn}           valid                 validation callback
*
* @return {Object}                                    Rule
*/
const RuleFactory = function ( set, get, valid, getErrors )
{

    /**
    * Generic set methods for the Rule factory state
    *
    * @typedef  {Object}        getters
    */
    const getters = addGetters( ruleMap, ruleGetter, get );


    /**
    * Generic set methods for the Rule factory state
    *
    * @typedef  {Object}        setters
    */
    const setters = addSetters( ruleMap, ruleSetter, set, valid, getErrors );


    /**
    * Gets the state of the Rule
    *
    * @return {Object}                               Rule state
    */
    const getState = () => getStateHelper( ruleMap, getters );


    /**
    * Sets the state of the Rule
    *
    * @param {Object}           state                Rule state
    *
    * @return {Array|undefined}                      Errors|undefined
    */
    const setState = state => setStateHelper( ruleMap, setters, getErrors, state );


    /**
    * Maps a Rule with multiple animation properties to a single property/value
    * pair each, based on the animation names which belong to the Rule. In
    * cases where there are not enough values of an animation property to give a
    * separate  value to each animation name, the values cycle from start to
    * finish as determined by valueAtIndex.
    *
    * @return {Array}                               Rules
    */
    const getEachRule = () =>
    {
        const state = getState();

        return state['animation-name'].map( ( animationName, index ) =>
        {
            return reduce( state, ( acc, value, prop ) =>
            {
                const val = valueAtIndex( index, value );

                if( val !== void 0 ) acc[prop] = [val];

                return acc;
            }, {} );
        } );
    };


    return {
        getErrors,
        getState,
        setState,
        getEachRule,
        ...getters,
        ...setters
    }

};

export default () => Factory( RuleState(), RuleFactory );