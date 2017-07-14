import Factory from 'factory/factory';
import ErrorHandler from 'factory/errorHandler';
import { keyframeSetter, keyframeGetter, keyframeMap } from 'constant/factory.constant';
import { addSetters, addGetters, getStateHelper, setStateHelper } from 'helper/factory.helper';


/**
* Keyframe State
*
* Returns a new Keyframe state.
*
* @return   {Object}                  Keyframe state
* @property {String}   state.name     name of the animation to which the Keyframe belongs
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
* Creates a new Keyframe. A Keyframe stores information about the timemarker,
* properties and name. Properties are key/value pairs.
*
* @param {callbackFn}          set                     set callback
* @param {callbackFn}          get                     get callback
* @param {callbackFn}          valid                   validation callback
*
* @return {Object}                                     keyframe
*/
const KeyframeFactory = function ( set, get, valid, getErrors )
{


    /**
    * Generic set methods for the Keyframe factory state
    *
    * @typedef {Object}        getters
    */
    const getters = addGetters( keyframeMap, keyframeGetter, get );


    /**
    * Generic set methods for the Keyframe factory state
    *
    * @typedef {Object}        setters
    */
    const setters = addSetters( keyframeMap, keyframeSetter, set, valid, getErrors );


    /**
    * Gets the state the current Keyframe
    *
    * @return {Object}                                 current Keyframe state
    */
    const getState = () => getStateHelper( keyframeMap, getters );


    /**
    * Sets the state of the current Keyframe
    *
    * @param {Object}           state                  Keyframe state
    *
    * @return {Array|undefined}                        Errors|undefined
    */
    const setState = state => setStateHelper( keyframeMap, setters, getErrors, state );


    /**
    * Sets the props in the state
    *
    * @param {Object}           props                  props to set
    */
    setters.setProps = props =>
    {
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