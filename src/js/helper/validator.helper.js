/**
* This file is part of Zoidberg <https://github.com/sociomantic-tsunami/zoidberg/>
* Copyright (c) 2017 sociomantic labs GmbH.
* MIT License. See accompanying LICENSE.txt for details.
*/


import isString from 'lodash/isString';
import isFinite from 'lodash/isFinite';
import isInteger from 'lodash/isInteger';
import isArray from 'lodash/isArray';
import { regex } from 'constant/validation.constant';
import { validate } from 'util/validator'


/**
* Checks if value is a string which includes numbers and a percent sign.
*
* @param {Array}            val                     value
*
* @return {Boolean}                                 true, if percent
*/
export const isPercent = val =>
{
    return isString( val ) && regex.percent.test( val );
};


/**
* Checks if value is a string which contains either from or to.
*
* @param {Array}            val                     value
*
* @return {Boolean}                                 true, if from or to
*/
export const isFromTo = val =>
{
    return isString( val ) && ( val === 'from' || val === 'to' );
};


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
};


/**
* Checks if value is a time value.
*
* @param {String}           val                     value
*
* @return {Boolean}                                 true, if time value
*/
export const isTime = val =>
{
    return isString( val ) && regex.time.test( val );
};


/**
* Checks if value is a direction.
*
* @param {String}           val                     value
*
* @return {Boolean}                                 true, if direction
*/
export const isDirection = val =>
{
    return isString( val ) && regex.direction.test( val );
};


/**
* Checks if value is a fill mode.
*
* @param {String}           val                     value
*
* @return {Boolean}                                 true, if fill mode
*/
export const isFillMode = val =>
{
    return isString( val ) && regex.fillMode.test( val );
};


/**
* Checks if value is a play state.
*
* @param {String}           val                     value
*
* @return {Boolean}                                 true, if play state
*/
export const isPlayState = val =>
{
    return isString( val ) && regex.playState.test( val );
};


/**
* Checks if value is a timing function value or function.
*
* @param {String}           val                     value
*
* @return {Boolean}                                 true, if timing value or function
*/
export const isTiming = val =>
{
    return isString( val ) && ( regex.timing.test( val ) || isCubicBezier( val ) || isSteps( val ) );
};


/**
* Checks if value is an iteration count.
*
* @param {String}            val                     value
*
* @return {Boolean}                                 true, if iteration count
*/
export const isIterationCount = val =>
{
    return isString( val ) && ( val === 'infinite' || isFinite( parseFloat( val ) ) );
};


/**
* Checks if value that should be a string with a length is defined
*
* @param {*}                val                     value
*
* @return {Boolean}                                 true, if defined
*/
export const isNonEmptyString = val =>
{
    return isString( val ) && val !== '';
};


/**
* Checks if value that should be an array with a length is defined
*
* @param {*}                val                     value
*
* @return {Boolean}                                 true, if defined
*/
export const isNonEmptyArray = val =>
{
    return isArray( val ) && !! val.length;
};


/**
* Returns a curried validator which is used on each value in an array.
*
* @param {CallbackFn}       validator               validator
* @param {Array}            values                  values
*
* @return {Boolean}                                 true, if valid
*/
export const validateArray = ( validator, values ) =>
{
    return values =>
    {
        if( ! isArray( values ) ) return false;

        const validated = values.map( value =>
        {
            return validator( value );
        } );

        return validated.every( Boolean );
    }
};


/**
* Checks if value is a timing function value or function.
*
* @param {String}           val                     value
*
* @return {Boolean}                                 true, if timing value or function
*/
export const isCubicBezier = val =>
{
    const parts  = val.split( '(' );
    const bezier = parts[0];
    const params = parts[1];

    if( bezier !== 'cubic-bezier' || ! params ) return false;

    const hasEndBracket = params.substr( -1 ) === ')';

    if( ! hasEndBracket ) return false;

    const numberStr  = params.slice( 0, -1 );
    const numberList = numberStr.split( ',' );

    return numberList.every( entry =>
    {
        return isFinite( parseFloat( entry ) );
    } );
};


/**
* Checks if value is a timing function value or function.
*
* @param {String}           val                     value
*
* @return {Boolean}                                 true, if timing value or function
*/
export const isSteps = val =>
{
    const parts  = val.split( '(' );
    const steps  = parts[0];
    const params = parts[1];

    if( steps !== 'steps' || ! params ) return false;

    const hasEndBracket = params.substr( -1 ) == ')';

    if( ! hasEndBracket ) return false;

    const numberStr  = params.slice( 0, -1 );
    const numberList = numberStr.split( ',' );
    const listLength = numberList.length;

    return numberList.every( ( entry, i, list ) =>
    {
        let start, end;
        let isInt = isInteger( parseFloat( entry ) );

        if( i === 0 && isString( entry ) ) start = entry.trim() === 'start';
        if( i === listLength-1 && isString( entry ) ) end = entry.trim() === 'end';

        return start || end || isInt;
    } );
};