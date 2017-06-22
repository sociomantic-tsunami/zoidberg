import Factory from 'factory/factory';
import ErrorHandler from 'factory/errorHandler';
import { keyframeSetter, keyframeGetter, keyframeMap } from 'constant/factory.constant';
import { addSetters, addGetters, getStateHelper, setStateHelper } from 'helper/factory.helper';


/**
* Keyframe State
*
* Returns a new keyframe state.
*
* @return   {Object}                  keyframe state
* @property {String}   state.name     name of the animation to which the keyframe belongs
* @property {Array}    state.props    time markers; can be from, to or a string percent value
* @property {Array}    state.markers  css prop/value pairs
* @property {Array}    state.errors   error objects containing prop, value and error messages
*/
const KeyframeState = () =>
{
    return {
        name         : '',
        props        : {},
        markers      : [],
        errorHandler : ErrorHandler()
    }
};


/**
* Keyframe Factory
*
* Creates a new keyframe object. A keyframe stores information about the keyframes
* timemarker, styling properties and name. Styling properties are key/value pairs.
*
* @param {callbackFn}      set              set callback
* @param {callbackFn}      get              get callback
* @param {callbackFn}      valid            validation callback
*
* @return {Object}                          keyframe
*/
const KeyframeFactory = function ( set, get, valid, getErrors )
{


    /**
    * Generic set methods for the keyframe factory state
    *
    * @typedef  {Object}   getters
    */
    const getters = addGetters( keyframeMap, keyframeGetter, get );


    /**
    * Generic set methods for the keyframe factory state
    *
    * @typedef  {Object}   setters
    */
    const setters = addSetters( keyframeMap, keyframeSetter, set, valid, getErrors );


    /**
    * Gets the state the current keyframe
    *
    * @return {Object}          state                 current keyframe state
    */
    const getState = () => getStateHelper( keyframeMap, getters );


    /**
    * Sets the state of the current keyframe
    *
    * @param {Object}           options                options to set
    *
    * @return {Array|undefined}                        errors|undefined
    */
    const setState = options => setStateHelper( keyframeMap, setters, getErrors, options );


    /**
    * Sets the props in the state
    *
    * @param {Object}           props                  props to set
    */
    setters.setProps = props =>
    {
        // validation of CSS would happen here during a conditional set
        if( valid( 'props', props ) )
        {
            const oldProps = get( 'props' );
            const newProps = { ...oldProps, ...props };

            set( 'props', newProps );
        }
    };


    return {
        getErrors,
        getState,
        setState,
        ...getters,
        ...setters
    }

};

export default () => Factory( KeyframeState(), KeyframeFactory );