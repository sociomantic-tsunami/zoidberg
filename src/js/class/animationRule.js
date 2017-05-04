import { ANIMATION_RULES } from 'constant/zoidberg';
import { buildSetter } from 'util/helpers';


/**
* Animation rule class
*
* Creates a new animation rule object. A animation rule stores information about
* the animations general settings.
*
* Options is an object with the following structure:
* {
*       animation-delay           : {arr} when the animation should start,
*       animation-direction       : {arr} cycles in which the animation should play,
*       animation-duration        : {arr} time to complete one animation cycle,
*       animation-fill-mode       : {arr} styles applied to target before and after execution,
*       animation-iteration-count : {arr} number of times animation should cycle,
*       animation-name            : {arr} animation name,
*       animation-play-state      : {arr} whether animation is playing, paused or running,
*       animation-timing-function : {arr} timing of start and end of animation
* }
*
* @param obj                    options               options
*
* @return obj                                         animation rule class
*/
export default class AnimationRule
{

    constructor( options = {} )
    {
        this.state  =
        {
            'animation-delay'           : [],
            'animation-direction'       : [],
            'animation-duration'        : [],
            'animation-fill-mode'       : [],
            'animation-iteration-count' : [],
            'animation-name'            : [],
            'animation-play-state'      : [],
            'animation-timing-function' : []
        }

        this.addSetters();
        this.setAnimationRule( options );
    }


    /**
    * Sets a value in the state
    *
    * @param str                prop                  state prop name
    * @param any                value                 the value to set
    */
    set( prop, value )
    {
        if( this.state.hasOwnProperty( prop ) )
        {
            this.state[prop] = value;
        }
    }


    /**
    * Gets a value from the state. The value is a deep clone.
    *
    * @param str                prop                  state prop name
    */
    get( prop )
    {
        return cloneDeep( this.state[prop] );
    }


    /**
    * Sets the name, markers and props of the current keyframe
    *
    * @param obj                options               keyframe options
    */
    setAnimationRule( options )
    {
        for( let rule in ANIMATION_RULES )
        {
            const prop = ANIMATION_RULES[rule];

            if( ANIMATION_RULES.hasOwnProperty( rule ) && options[prop] )
            {
                this['set' + rule]( options[prop] );
            }
        }
    }


    /**
    * Gets the state of the current animation rule
    *
    * @return obj                                      current state
    */
    getAnimationRule()
    {
        const state = {};

        for( let rule in ANIMATION_RULES )
        {
            if( ANIMATION_RULES.hasOwnProperty( rule ) )
            {
                const prop = ANIMATION_RULES[rule];

                state[prop] = this.get( prop );
            }
        }

        return state;
    }


    /**
    * Validates a value according to the type of prop and returns an error state
    * object. The error state includes a valid prop indicating whether the validation
    * returned true or false and an updated error array containing current errors.
    * Sets the updated errors in the state and returns the valid boolean.
    *
    * @param any                val                     value
    * @param str                prop                    name of prop to be validated
    *
    * @return bool                                      true, if valid
    */
    valid( val, prop )
    {
        const oldErrors  = this.get( 'errors' );
        const errorState = getErrorState( val, prop, oldErrors );
        const newErrors  = errorState.errors;
        const valid      = errorState.valid;

        this.set( 'errors', newErrors );

        return valid;
    }


    /**
    * Adds the setters used to modifiy the state values
    */
    addSetters()
    {
        for( let rule in ANIMATION_RULES )
        {
            if( ANIMATION_RULES.hasOwnProperty( rule ) )
            {
                this['set' + rule] = buildSetter.bind( this, rule );
            }
        }
    }

}