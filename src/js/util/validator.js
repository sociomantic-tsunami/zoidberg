import { validation, iteration, getValidators } from 'constant/validation.constant';
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
export const validate = ( prop, val ) =>
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
* is valid and an array of what errors may exist. A prop is valid when all
* validators and subvalidators return true.
*
* @param {String}           prop                    name of prop to be validated
* @param {*}                val                     value
* @param {Array}            oldErrors               pre-existing errors
*
* @return {Object}                                  error state
*/
export const getErrorState = ( prop, val, oldErrors ) =>
{
    if( validation[prop] )
    {
        let errors       = [ ...oldErrors];
        const validators = getValidators( prop );

        const valid = validators.map( _prop =>
        {
            let iterator = iteration[ _prop];
            let _valid   = iterator ? iterator( _prop, val ) : validate( _prop, val );

            if( _valid )
            {
                errors = errors.filter( err => err.prop !== _prop );
            }
            else
            {
                const validatorMsg = validation[ _prop]['msg'] || 'error';
                const validatorErr = { prop : _prop, msg : validatorMsg, val };

                errors.push( validatorErr );
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