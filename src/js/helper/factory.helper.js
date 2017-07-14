import mapKeys from 'lodash/mapKeys';
import ErrorHandler from 'factory/errorHandler';
import { validateDeep } from 'util/validator.js';


/**
* Returns an object of factory-specific generic set rules. Each set method
* must pass validation in order to be set; each returns an array of Errors or
* undefined.
*
* @param {Object}           rule                  callback constants
* @param {Object}           setters               set rules to add
* @param {callbackFn}       set                   setter callback
* @param {callbackFn}       valid                 validator callback
* @param {callbackFn}       getErrors             error getter callback
*
* @param {Object}           methods               generic add methods
*/
export const addSetters = ( rule, setters, set, valid, getErrors ) =>
{
    const func = {};

    setters.forEach( i =>
    {
        func['set' + i] = val =>
        {
            if( valid( rule[i], val ) ) set( rule[i], val );

            return getErrors();
        };
    } );

    return func;
};


/**
* Returns an object of factory-specific generic get rules.
*
* @param {Object}           rule                  callback constants
* @param {Object}           getters               get rules to add
* @param {callbackFn}       get                   getter callback
*
* @param {Object}           methods               generic get methods
*/
export const addGetters = ( rule, getters, get ) =>
{
    const func = {};

    getters.forEach( i =>
    {
        func['get' + i] = () => get( rule[i] );
    } );

    return func;
};


/**
* Returns an object containing all current key/value pairs of a state.
*
* @param {Object}           rule               callback constants
* @param {callbackFn}       getters            getter callbacks
*
* @param {Object}           state              current state
*/
export const getStateHelper = ( rule, getters ) =>
{
    const state = {};

    mapKeys( rule, ( val, i ) =>
    {
        const callbackFn = getters['get' + i];
        state[val] = callbackFn();
    } );

    return state;
};


/**
* Sets all properties of a state, if they are defined.
*
* @param {Object}           state              state to set
* @param {Object}           rule               callback constants
* @param {callbackFn}       setters            setter callbacks
* @param {callbackFn}       getErrors          error getter callback
*
* @return {Object|undefined}                   Error|undefined
*/
export const setStateHelper = ( rule, setters, getErrors, state = {} ) =>
{
    const handler = ErrorHandler();
    const valid   = validateDeep( 'state', state, handler );

    if( ! valid ) return handler.get();

    mapKeys( rule, ( val, i ) =>
    {
        const callbackFn = setters['set' + i];
        const hasProp    = state.hasOwnProperty( val );

        if( hasProp ) callbackFn( state[val] );
    } );

    return getErrors();
};


/**
* If the index given is greater than the length of the array, recursively subtracts
* the array length from the original index in order to determine which array
* element should be returned. Otherwise, returns the array element given the index.
*
* @param {Number}           index                  index
* @param {Array}            array                  array
*
* @param {*}                value                  value at index
*/
export const valueAtIndex = ( index, array ) =>
{
    if( ! array.length ) return undefined;

    if( index >= array.length )
    {
        return valueAtIndex( index - array.length, array )
    }

    return array[index];
};