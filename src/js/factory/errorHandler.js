/**
* This file is part of Zoidberg <https://github.com/sociomantic-tsunami/zoidberg/>
* Copyright (c) 2017 sociomantic labs GmbH.
* MIT License. See accompanying LICENSE.txt for details.
*/


import { validation } from 'constant/validation.constant';
import cloneDeep from 'lodash/cloneDeep';


/**
* Error Handler Factory
*
* Handler for managing Zoidberg errors.
*
* @param {Object}             errorState             Error
* @property {Array}           state.errors           errors
*/
const ErrorHandlerFactory = function ( errorState )
{

    /**
    * State of the error handler.
    *
    * @typedef {Object}       state                  Error
    * @property {Array}       state.errors           current errors
    */
    let state =
    {
        errors : []
    };


    /**
    * Gets the state.
    *
    * @return {Object}                               Error
    */
    const get = () => cloneDeep( state );


    /**
    * Sets the errors in the state.
    *
    * @param {Object}         errorState             Error
    * @property {Array}       state.errors           errors
    */
    const set = errorState =>
    {
        const { errors } = errorState;

        state.errors = [ ...state.errors, ...errors];
    };


    /**
    * Determines whether there are errors in the handler state.
    *
    * @return {Boolean}                              true, if has errors
    */
    const hasErrors = () =>
    {
        const { errors } = state;

        return !! errors.length;
    };


    /**
    * Removes errors from the state.
    *
    * @param {String}         prop                   prop
    * @param {*}              val                    value
    */
    const remove = prop =>
    {
        const { errors } = state;
        const newErrors  = errors.filter( err => err.prop !== prop );

        state = { errors : newErrors };
    };


    /**
    * Adds errors to the state.
    *
    * @param {String}         prop                   prop
    * @param {*}              val                    value
    */
    const add = ( prop, val ) =>
    {
        const { errors } = state;

        errors.push( { prop, val, msg : validation[prop].msg } );
    };


    /**
    * Handles new and existing errors. Removes existing errors that match the
    * given prop. If the valid param is false, add a new error to the state.
    *
    * @param {String}         prop                   prop
    * @param {*}              val                    value
    * @param {Boolean}        valid                  true, if value is valid
    */
    const handle = ( prop, val, valid ) =>
    {
        remove( prop );

        if( ! valid ) add( prop, val );
    };


    if( errorState ) set( errorState );

    return {
        set,
        get,
        add,
        remove,
        handle,
        hasErrors
    }

};

export default ( errorState ) => ErrorHandlerFactory( errorState );