import { validation, iteration } from 'constant/validation.constant';
import { validationInfo } from 'constant/info.constant';
import isFunction from 'lodash/isFunction';


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

    if( isFunction( validator ) )
    {
        return validator( val );
    }
    else
    {
        throw new Error( validationInfo.validator );
    }
};


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
    if( validation[prop] )
    {
        let errors = [ ...oldErrors];

        // Put the validator and subvalidator function names together
        const subValidators = validation[prop]['subValidator'] || [];
        const validators    = [ ...subValidators, prop];

        // True, when all validators and subvalidators return true
        const valid = validators.map( _prop =>
        {
            // Use the validate function or an iteration based validate function
            let iterator = iteration[ _prop];
            let _valid   = iterator ? iterator( _prop, val ) : validate( _prop, val );

            if( _valid )
            {
                // Remove all errors related to current prop
                errors = errors.filter( err => err.prop !== _prop );
            }
            else
            {
                // Create a new error related to current prop
                const validatorMsg = validation[ _prop]['msg'] || 'error';
                const validatorErr = { prop : _prop, msg : validatorMsg, val };

                errors = [ ...errors, validatorErr];
            }

            return _valid;
        } )
        .every( Boolean );

        return { errors, valid };
    }
    else
    {
        throw new Error( validationInfo.prop );
    }
};