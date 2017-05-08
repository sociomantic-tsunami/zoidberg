import Factory from 'factory/factory';


/**
* State
*
* Returns a new keyframe state.
*
* @return   {Object}                          keyframe state
* @property {String}   keyframeState.name     name of the animation to which the keyframe belongs
* @property {Array}    keyframeState.props    time markers; can be from, to or a string percent value
* @property {Array}    keyframeState.markers  css prop/value pairs
* @property {Array}    keyframeState.errors   error objects containing prop, value and error messages
*/
const KeyframeState = () =>
{
    return {
        name    : '',
        props   : {},
        markers : [],
        errors  : []
    }
}


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
    * Sets the name, markers and props of the current keyframe
    *
    * @param {Object}           options               keyframe options
    */
    const setKeyframe = ( options = {} ) =>
    {
        if( options.name )    setName( options.name );
        if( options.markers ) setMarkers( options.markers );
        if( options.props )   setProps( options.props );
    }


    /**
    * Gets the name, markers and props of the current keyframe
    *
    * @return {Object}                                 name, markers and props state
    */
    const getKeyframe = () =>
    {
        return {
            name    : get( 'name' ),
            markers : get( 'markers' ),
            props   : get( 'props' )
        };
    }


    /**
    * Gets the name of the current keyframe
    *
    * @return {String}                                 name state
    */
    const getName = () =>
    {
        return get( 'name' );
    }


    /**
    * Gets the markers of the current keyframe
    *
    * @return {Array}                                 markers state
    */
    const getMarkers = () =>
    {
        return get( 'markers' );
    }


    /**
    * Gets the props of the current keyframe
    *
    * @return {Array}                                 props state
    */
    const getProps = () =>
    {
        return get( 'props' );
    }


    /**
    * Gets the errors of the current keyframe
    *
    * @return {Array}                                 errors state
    */
    const getErrors = () =>
    {
        return get( 'errors' );
    }


    /**
    * Sets the name in the state
    *
    * @param {String}            name                  name
    */
    const setName = name =>
    {
        if( valid( 'name', name ) )
        {
            set( 'name', name );
        }
    }


    /**
    * Sets the markers in the state
    *
    * @param {Array}            marks                  markers to set
    */
    const setMarkers = marks =>
    {
        if( valid( 'markers', marks ) && valid( 'marker', marks ) )
        {
            set( 'markers', marks );
        }
    }


    /**
    * Sets the props in the state
    *
    * @param {Object}           props                   props to set
    */
    const setProps = props =>
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
        getErrors,
        getName,
        getMarkers,
        getProps,
        setName,
        setMarkers,
        setProps
    }

}

export default ( options ) => Factory( KeyframeState(), KeyframeFactory, options );