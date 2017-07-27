/**
* This file is part of Zoidberg <https://github.com/sociomantic-tsunami/zoidberg/>
* Copyright (c) 2017 sociomantic labs GmbH.
* MIT License. See accompanying LICENSE.txt for details.
*/


import { getValidator } from 'constant/validation.constant';
import ErrorHandler from 'factory/errorHandler';


/**
* Validates a prop using its validator.
*
* @param {String}           prop                    name of prop to be validated
* @param {*}                val                     value
*
* @return {Boolean}                                 true, if valid
*/
export const validate = ( prop, val ) =>
{
    return getValidator( prop )( val );
};


/**
* Performs validation using the validator associated with the prop and any
* sub-validators that may exist. Any errors are handled by the given error handler.
*
* @param {String}           prop                    prop
* @param {*}                val                     value
* @param {CallbackFn}       errorHandler            error handler
*
* @return {Boolean}                                 true, if has error
*/
export const validateDeep = ( prop, val, errorHandler ) =>
{
    return getValidator( prop, true ).map( validatorInfo =>
    {
        const { validator, prop : subProp } = validatorInfo;

        const valid = validator( val );

        errorHandler.handle( subProp, val, valid );

        return valid;

    } ).every( Boolean );
};


/**
* Returns the error states when setting the initial state of a new factory, if it
* exists. Includes which props failed and an array of what errors may exist.
*
* @param {CallbackFn}       factory                 factory callback
* @param {Array}            state                   initial states
*
* @return {Object}                                  error state
*/
export const validateCreate = ( factory, states ) =>
{
    const handler = ErrorHandler();

    states.forEach( state =>
    {
        const errors = factory().setState( state );

        if( errors ) handler.set( errors );
    } );

    if( handler.hasErrors() ) return handler.get();
}