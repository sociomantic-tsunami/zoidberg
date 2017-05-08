import { getErrorState } from 'util/validator/validator';
import cloneDeep from 'lodash/cloneDeep';


/**
* Factory
*
* Contains utility methods for getting, setting and validation accessable to the
* sub-factory.
*
* @param {Object}      state                sub-factory state
* @param {callbackFn}  subFactory           sub-factory callback
* @param {Object}      options              props to set in sub-factory state
*
* @return {Object}                          exposed methods of the sub-factory
*/
export default function Factory ( state, subFactory, options )
{

    /**
    * Sets a value in the state
    *
    * @param {String}           prop                  state prop name
    * @param {*}                value                 the value to set
    */
    const set = function ( prop, value )
    {
        state[prop] = cloneDeep( value );
    }


    /**
    * Gets a value from the state. The value is a deep clone.
    *
    * @param {String}           prop                  state prop name
    */
    const get = function ( prop )
    {
        return cloneDeep( state[prop] );
    }


    /**
    * Validates a value according to the type of prop and returns an error state
    * object. The error state includes a valid prop indicating whether the validation
    * returned true or false and an updated error array containing current errors.
    * Sets the updated errors in the state and returns the valid boolean.
    *
    * @param {*}                val                     value
    * @param {String}           prop                    name of prop to be validated
    *
    * @return {Boolean}                                 true, if valid
    */
    const valid = function ( prop, val )
    {
        const oldErrors  = get( 'errors' );
        const errorState = getErrorState( prop, val, oldErrors );
        const newErrors  = errorState.errors;
        const valid      = errorState.valid;

        set( 'errors', newErrors );

        return valid;
    }


    return subFactory( set, get, valid, options );
}