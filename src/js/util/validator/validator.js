import validation from 'constant/validation';
import { validationMsg } from 'constant/info';
import { isFunction, isArray } from 'util/validator/validatorHelpers';


/**
* Validates an array by using its validator on each element.
*
* @param {Array}            val                     array of values
* @param {String}           prop                    name of prop to be validated
*
* @return {Boolean}                                 true, if valid
*/
const validateArray = function ( val, prop )
{
    console.log( 'called!' );

    const validated = [];

    for( let i=0; i<val.length; i++ )
    {
        if( validate( val[i], prop ) )
        {
            validated.push( val[i] );
        }
    }

    return validated.every( Boolean );
}


/**
* Validates a prop using its validator.
*
* @param {*}                val                     value
* @param {String}           prop                    name of prop to be validated
*
* @return {Boolean}                                 true, if valid
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
* @param {*}                val                     value
* @param {String}           prop                    name of prop to be validated
* @param {Array}            oldErrors               pre-existing errors
*
* @return {Object}                                  error state
*/
export const getErrorState = function ( val, prop, oldErrors )
{
    let errors;

    const valid = isArray( val ) ? validateArray( val, prop ) : validate( val, prop );

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