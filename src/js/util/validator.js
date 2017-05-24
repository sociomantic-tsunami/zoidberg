import { validation, iteration, info, getValidators } from 'constant/validation.constant';
import isFunction from 'lodash/isFunction';


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
    const validator = validation[prop] && validation[prop].validator;

    if( ! isFunction( validator ) )
    {
        throw new Error( info.validator );
    }

    return validator( val );
};


/**
* Returns the error state of a validated property. Includes whether the prop
* is valid and an array of what errors may exist. A prop is valid when all
* validators and subvalidators return true.
*
* @param {String}           validator               prop to be validated
* @param {*}                val                     value
* @param {Array}            oldErrors               pre-existing errors
*
* @return {Object}                                  error state
*/
export const getErrorState = ( validator, val, oldErrors ) =>
{
    if( ! validation[validator] )
    {
        throw new Error( info.validation );
    }

    let errors = [ ...oldErrors];

    const subValidators = validation[validator]['subValidator'] || [];
    const validators    = [ ...subValidators, validator];

    const valid = validators.map( prop =>
    {
        const iterator = iteration[prop];
        const isValid  = iterator ? iterator( prop, val ) : validate( prop, val );

        errors = errors.filter( err => err.prop !== prop );

        if( ! isValid ) errors.push( { prop, msg : validation[prop]['msg'], val } );

        return isValid;
    } ).every( Boolean );

    return { errors, valid };
};