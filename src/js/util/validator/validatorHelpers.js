import isString from 'lodash';
import { regex } from 'constant/validation';
import { validate } from 'util/validator/validator'


/**
* Checks if value is a string which includes numbers and a percent sign.
*
* @param {Array}            val                     value
*
* @return {Boolean}                                 true, if percent
*/
export const isPercent = val =>
{
	return _.isString( val ) && regex.percent.test( val );
}


/**
* Checks if value is a string which contains either from or to.
*
* @param {Array}            val                     value
*
* @return {Boolean}                                 true, if from or to
*/
export const isFromTo = val =>
{
	return _.isString( val ) && ( val.includes( 'from' ) || val.includes( 'to' ) );
}


/**
* Checks if value is a string which includes a percent value or either from or to.
*
* @param {Array}            val                     value
*
* @return {Boolean}                                 true, if percent
*/
export const isMarker = val =>
{
	return isPercent( val ) || isFromTo( val );
}


/**
* Validates an array by using its validator on each element.
*
* @param {String}           prop                    name of prop to be validated
* @param {Array}            val                     array of values
*
* @return {Boolean}                                 true, if valid
*/
export const validateArray = ( prop, val ) =>
{
    const validated = val.map( value =>
	{
		return validate( prop, value );
	} );

    return validated.every( Boolean );
}

