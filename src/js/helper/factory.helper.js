import mapKeys from 'lodash/mapKeys';


/**
* Returns an object of factory-specific generic set rules
*
* @param {Object}           rule                  callback constants
* @param {Object}           setters               set rules to add
* @param {callbackFn}       set                   setter callback
* @param {callbackFn}       valid                 validator callback
*
* @param {Object}           methods               generic methods
*/
export const addSetters = ( rule, setters, set, valid ) =>
{
    const func = {};

    setters.forEach( i =>
    {
        func['set' + i] = val =>
        {
            if( valid( rule[i], val ) ) set( rule[i], val );
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
    const func =
    {
        getErrors : () => get( 'errors' )
    };

    getters.forEach( i =>
    {
        func['get' + i] = () => get( rule[i] );
    } );

    return func;
};


/**
* Returns an object containing the current key/value pairs of a state.
*
* @param {Object}           rule               callback constants
* @param {callbackFn}       getters            getter callbacks
*
* @param {Object}           state              current state
*/
export const getState = ( rule, getters ) =>
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
* Sets options in a state if the option exists.
*
* @param {Object}           options            options to set
* @param {Object}           rule               callback constants
* @param {callbackFn}       setters            getter callbacks
*
* @param {Object}           state              current state
*/
export const setState = ( rule, setters, options = {} ) =>
{
    mapKeys( rule, ( val, i ) =>
    {
        let callbackFn = setters['set' + i];

        if( options[val] ) callbackFn( options[val] );
    } );
};