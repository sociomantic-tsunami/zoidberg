import { getErrorState } from 'util/validator/validator';
import { cloneDeep } from 'util/helpers';
import validation from 'constant/validation';


/**
* Keyframe class
*
* Creates a new keyframe object. A keyframe stores information about the keyframes
* timemarker, styling properties and name. Styling properties are key/value pairs.
*
* Options is an object with the following structure:
* {
*       name    : {str} name of the animation to which the keyframe belongs,
*       markers : {arr} time markers; can be from, to or a string percent value,
*       props   : {obj} css prop/value pairs,
*       errors  : {arr} error object containing prop, value and error message
* }
*
* @param obj                    options               options
*
* @return obj                                         keyframe class
*/
export default class Keyframe
{

    constructor( options = {} )
    {
        this.state  =
        {
            name    : '',
            props   : {},
            markers : [],
            errors  : []
        }

        this.setKeyframe( options );
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
    setKeyframe( options )
    {
        if( options.name )    this.setName( options.name );
        if( options.markers ) this.setMarkers( options.markers );
        if( options.props )   this.setProps( options.props );
    }


    /**
    * Gets the name markers and props of the current keyframe
    *
    * @return obj                                     name, markers and props state
    */
    getKeyframe()
    {
        return {
            name    : this.get( 'name' ),
            markers : this.get( 'markers' ),
            props   : this.get( 'props' )
        };
    }


    /**
    * Sets the name in the state
    *
    * @param str                name                  name
    */
    setName( name )
    {
        if( this.valid( name, 'name' ) )
        {
            this.set( 'name', name );
        }
    }


    /**
    * Sets the markers in the state
    *
    * @param arr                marks                  markers to set
    */
    setMarkers( marks )
    {
        if( this.valid( marks, 'markers' ) )
        {
            const markers = [];

            for( let i=0; i<marks.length; i++ )
            {
                if( this.valid( marks[i], 'marker' ) )
                {
                    markers.push( marks[i] );
                }
            }

            this.set( 'markers', markers );
        }
    }


    /**
    * Sets a prop in the state
    *
    * @param str                prop                    prop to set
    * @param str                value                   value to set
    */
    setProp( prop, value )
    {
        // validation of CSS would happen here during a conditional set
        const oldProps = this.get( 'props' );
        const newProps = { ...oldProps, [prop] : value };

        this.set( 'props', newProps );
    }


    /**
    * Sets the props in the state
    *
    * @param obj                props                   props to set
    */
    setProps( props )
    {
        if( this.valid( props, 'props' ) )
        {
            for( let prop in props )
            {
                this.setProp( prop, props[prop] );
            }
        }
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

}