import { setter, getter, keyframe } from 'constant/factory.constant';
import { addSetters, addGetters, getState, setState } from 'helper/factory.helper';
import Factory from 'factory/factory';


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
        name    : '',
        props   : {},
        markers : [],
        errors  : []
    }
};


/**
* Keyframe Factory
*
* Creates a new keyframe object. A keyframe stores information about the keyframes
* timemarker, styling properties and name. Styling properties are key/value pairs.
*
* @param {Object}      options              options
*
* @return {Object}                          keyframe
*/
const KeyframeFactory = function ( set, get, valid, options )
{

    /**
    * Generic set methods for the keyframe factory state
    *
    * @typedef  {Object}   setters
    */
    const setters = addSetters( keyframe, setter.keyframe, set, valid );


    /**
    * Generic set methods for the keyframe factory state
    *
    * @typedef  {Object}   getters
    */
    const getters = addGetters( keyframe, getter.keyframe, get );


    /**
    * Sets the name, markers and props of the current keyframe in the state
    *
    * @param {Object}           options               keyframe options
    */
    const setKeyframe = options => setState( keyframe, setters, options );


    /**
    * Gets the name, markers and props of the current keyframe
    *
    * @return {Object}          state                 current keyframe state
    */
    const getKeyframe = () => getState( keyframe, getters );


    /**
    * Sets the props in the state
    *
    * @param {Object}           props                   props to set
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
    }

    setKeyframe( options );

    return {
        getKeyframe,
        ...setters,
        ...getters
    }

};

export default ( options ) => Factory( KeyframeState(), KeyframeFactory, options );