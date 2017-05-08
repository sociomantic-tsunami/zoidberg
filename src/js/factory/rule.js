import { ruleMethods } from 'constant/zoidberg';
import { addGenericMethods } from 'factory/factoryHelpers';
import Factory from 'factory/factory';


/**
* Rule State
*
* Returns a new animation rule state.
*
* @return   {Object}                                           rule state
* @property {Array}    ruleState['animation-delay']            when the animation should start
* @property {Array}    ruleState['animation-direction']        cycles in which the animation should play
* @property {Array}    ruleState['animation-duration']         time to complete one animation cycle
* @property {Array}    ruleState['animation-fill-mode']        styles applied to target before and after execution
* @property {Array}    ruleState['animation-iteration-count']  number of times animation should cycle
* @property {Array}    ruleState['animation-name']             animation name
* @property {Array}    ruleState['animation-play-state']       whether animation is playing, paused or running
* @property {Array}    ruleState['animation-timing-function']  timing of start and end of animation
*/
const RuleState = () =>
{
    return {
        errors : [],
        'animation-delay'           : [],
        'animation-direction'       : [],
        'animation-duration'        : [],
        'animation-fill-mode'       : [],
        'animation-iteration-count' : [],
        'animation-name'            : [],
        'animation-play-state'      : [],
        'animation-timing-function' : []
    }
}


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
    * Generic get and set methods for the rule factory state
    *
    * @typedef  {Object}   genericMethods
    */
    const genericMethods = addGenericMethods( ruleMethods, set, get );


    /**
    * Sets the state of the current rule given the passed options
    *
    * @param {Object}           options               rule options
    */
    const setRule = ( options = {} ) =>
    {
        if( options['animation-delay'] )           setDelay( options['animation-delay'] );
        if( options['animation-direction'] )       setDirection( options['animation-direction'] );
        if( options['animation-duration'] )        setDuration( options['animation-duration'] );
        if( options['animation-fill-mode'] )       setFillMode( options['animation-fill-mode'] );
        if( options['animation-iteration-count'] ) setIterationCount( options['animation-iteration-count'] );
        if( options['animation-name'] )            setName( options['animation-name'] );
        if( options['animation-play-state'] )      setPlayState( options['animation-play-state'] );
        if( options['animation-timing-function'] ) setTiming( options['animation-timing-function'] );
    };


    /**
    * Gets the state of the current rule
    *
    * @return {Object}                                 state
    */
    const getRule = () =>
    {
        return {
            'animation-delay'           : get( 'animation-delay' ),
            'animation-direction'       : get( 'animation-direction' ),
            'animation-duration'        : get( 'animation-duration' ),
            'animation-fill-mode'       : get( 'animation-fill-mode' ),
            'animation-iteration-count' : get( 'animation-iteration-count' ),
            'animation-name'            : get( 'animation-name' ),
            'animation-play-state'      : get( 'animation-play-state' ),
            'animation-timing-function' : get( 'animation-timing-function' )
        };
    };

    setRule( options );

    return {
        setRule,
        getRule,
        ...genericMethods
    }

}

export default ( options ) => Factory( RuleState(), RuleFactory, options );