import { validation, iteration } from 'constant/validation';
import { validationMsg } from 'constant/info';
import isFunction from 'lodash';


/**
* Validates a prop using its validator.
*
* @param {String}           prop                    name of prop to be validated
* @param {*}                val                     value
*
* @return {Boolean}                                 true, if valid
*/
export const validate = function ( prop, val )
{
    const validator = validation[prop] && validation[prop].validator;

    if( _.isFunction( validator ) )
    {
        return validator( val );
    }
    else
    {
        throw new Error( validationMsg.error );
    }
}


/**
* Returns the error state of a validated property. Includes whether the prop
* is valid and an array of what errors may exist.
*
* @param {String}           prop                    name of prop to be validated
* @param {*}                val                     value
* @param {Array}            oldErrors               pre-existing errors
*
* @return {Object}                                  error state
*/
export const getErrorState = function ( prop, val, oldErrors )
{
    let errors;

    const iterate = iteration[prop];
    const valid   = iterate ? iterate( prop, val ) : validate( prop, val );

    if( valid )
    {
        errors = oldErrors.filter( err => err.prop !== prop );
    }
    else
    {
        const validator    = validation[prop];
        const validatorMsg = validator ? validator.msg : 'error';
        const validatorErr = { prop, val, msg : validatorMsg };

        errors = [ ...oldErrors, validatorErr ];
    }

    return { errors, valid };
}