import { getErrorState } from 'util/validator';
import cloneDeep from 'lodash/cloneDeep';


/**
* Factory
*
* Contains utility methods for getting, setting and validation which are made
* accessible to the sub-factory.
*
* @param {Object}      state                sub-factory state
* @param {callbackFn}  subFactory           sub-factory callback
*
* @return {Object}                          exposed methods of the sub-factory
*/
export default function Factory ( state, subFactory )
{

    /**
    * Sets a value in the state
    *
    * @param {String}           prop                  state prop name
    * @param {*}                value                 the value to set
    */
    const set = ( prop, value ) =>
    {
        state[prop] = cloneDeep( value );
    };


    /**
    * Gets a value from the state. The value is a deep clone.
    *
    * @param {String}           prop                  state prop name
    */
    const get = prop =>
    {
        return cloneDeep( state[prop] );
    };


    /**
    * Gets the errors from the state.
    *
    * @return {Array|undefined} errors                error objects or undefined
    */
    const getErrors = () =>
    {
        const errors = get( 'errors' );

        return errors.length ? errors : undefined;
    };


    /**
    * Validates a value according to the type of prop and returns an error state
    * object. The error state includes a valid prop, indicating the validation
    * boolean, and an errors prop, which contains an array of current error
    * objects. Sets the updated errors in the state and returns the valid boolean.
    *
    * @param {*}                val                     value
    * @param {String}           prop                    name of prop to be validated
    *
    * @return {Boolean}                                 true, if valid
    */
    const valid = ( prop, val ) =>
    {
        const oldErrors  = get( 'errors' );
        const errorState = getErrorState( prop, val, oldErrors );
        const newErrors  = errorState.errors;
        const valid      = errorState.valid;

        set( 'errors', newErrors );

        return valid;
    };


    return subFactory( set, get, valid, getErrors );
}