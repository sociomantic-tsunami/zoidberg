import { setter, getter, rule } from 'constant/factory.constant';
import { addSetters, addGetters, getState, setState } from 'helper/factory.helper';
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
* @param {Object}      options               options
*
* @return {Object}                           animation rule
*/
const RuleFactory = function ( set, get, valid, options )
{

    /**
    * Generic set methods for the rule factory state
    *
    * @typedef  {Object}   getters
    */
    const setters = addSetters( rule, setter.rule, set, valid );


    /**
    * Generic set methods for the rule factory state
    *
    * @typedef  {Object}   setters
    */
    const getters = addGetters( rule, getter.rule, get );


    /**
    * Sets the state of the current rule given the passed options
    *
    * @param {Object}           options               rule options
    */
    const setRule = options => setState( rule, setters, options );


    /**
    * Gets the state of the current rule
    *
    * @return {Object}                                 state
    */
    const getRule = () => getState( rule, getters );

    setRule( options );

    return {
        getRule,
        ...setters,
        ...getters
    }

};

export default ( options ) => Factory( RuleState(), RuleFactory, options );