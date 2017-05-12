import mapKeys from 'lodash/mapKeys';


/**
* Returns an object of factory-specific generic set rules
*
* @param {Object}           rule                  callback constants
* @param {Object}           setters               set rules to add
* @param {callbackFn}       set                   setter callback
* @param {callbackFn}       valid                 validator callback
* @param {callbackFn}       getErrors             error getter callback
*
* @param {Object}           methods               generic methods
*/
export const addSetters = ( rule, setters, set, valid, getErrors ) =>
{
    const func = {};

    setters.map( i =>
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
* Returns an object of factory-specific generic get rules
*
* @param {Object}           rule                  callback constants
* @param {Object}           getters               get rules to add
* @param {callbackFn}       get                   getter callback
*
* @param {Object}           methods               generic methods
*/
export const addGetters = ( rule, getters, get ) =>
{
    const func = {};

    getters.map( i =>
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
        let callbackFn = getters['get' + i];
        state[val]     = callbackFn();
    } );

    return state;
};


/**
* Sets all options in a state, if they are defined in options.
*
* @param {Object}           options            options to set
* @param {Object}           rule               callback constants
* @param {callbackFn}       setters            getter callbacks
* @param {callbackFn}       getErrors          error getter callback
*
* @param {Object}           state              current state
*/
export const setStateHelper = ( rule, setters, getErrors, options = {} ) =>
{
    mapKeys( rule, ( val, i ) =>
    {
        let callbackFn = setters['set' + i];

        if( options[val] ) callbackFn( options[val] );
    } );

    return getErrors();
};