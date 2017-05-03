import validation from 'constant/validation';
import { validationMsg } from 'constant/info';
import { isFunction } from 'util/validator/helpers';


/**
* Validates a prop using its validator.
*
* @param any                val                     value
* @param str                prop                    name of prop to be validated
*
* @return bool                                      true, if valid
*/
export const validate = function ( val, prop )
{
    const validator = validation[prop] && validation[prop].validator;

    if( isFunction( validator ) )
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
* @param any                val                     value
* @param str                prop                    name of prop to be validated
* @param arr                oldErrors               pre-existing errors
*
* @return obj                                       error state
*/
export const getErrorState = function( val, prop, oldErrors )
{
    let errors;

    const valid = validate( val, prop );

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