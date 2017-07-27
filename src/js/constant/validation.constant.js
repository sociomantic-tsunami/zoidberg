/**
* This file is part of Zoidberg <https://github.com/sociomantic-tsunami/zoidberg/>
* Copyright (c) 2017 sociomantic labs GmbH.
* MIT License. See accompanying LICENSE.txt for details.
*/


import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import isFinite from 'lodash/isFinite';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import {
    isMarker,
    validateArray,
    isTime,
    isDirection,
    isFillMode,
    isPlayState,
    isTiming,
    isIterationCount,
    isNonEmptyString,
    isNonEmptyArray
} from 'helper/validator.helper';


/**
* Validation info
*
* @property {String}             mapping.<type>          message when invalid
*/
export const info =
{
    validator  : 'Validator does not exist',
    iterator   : 'Iterator does not exist',
    validation : 'Validation for prop does not exist'
};


/**
* Validator regex
*
* @property {RegEx}             mapping.<validation>    regex used in validator
*/
export const regex =
{
    percent   : /^([0-9]+(%))$/,
    time      : /^(-?[0-9]+(s|ms))$/,
    direction : /^(normal|reverse|alternate|alternate-reverse|inherit|initial|unset)$/,
    fillMode  : /^(none|forwards|backwards|both)$/,
    playState : /^(running|paused|inherit|initial|unset)$/,
    timing    : /^(ease|ease-in|ease-out|ease-in-out|linear|step-start|step-end|initial|inherit|unset)$/
};


/**
* Validation mapping
*
* @property {callbackFn}         mapping.validator       validator callback
* @property {String}             mapping.msg             message when invalid
* @property {Array}              mapping.subValidator    list of sub validators
*/
export const validation =
{

    'markers' :
    {
        validator : isArray,
        msg : 'Markers must be an array',
        subValidator : ['marker']
    },

    'animation-delay' :
    {
        validator : isArray,
        msg : 'Animation delay must be an array',
        subValidator : ['delay']
    },

    'animation-direction' :
    {
        validator : isArray,
        msg : 'Animation direction must be an array',
        subValidator : ['direction']
    },

    'animation-duration' :
    {
        validator : isArray,
        msg : 'Animation duration must be an array',
        subValidator : ['duration']
    },

    'animation-fill-mode' :
    {
        validator : isArray,
        msg : 'Animation fill mode must be an array',
        subValidator : ['fillMode']
    },

    'animation-name' :
    {
        validator : isArray,
        msg : 'Animation name must be an array',
        subValidator : ['requiredLength','requiredStrings']
    },

    'animation-play-state' :
    {
        validator : isArray,
        msg : 'Animation play state must be an array',
        subValidator : ['playState']
    },

    'animation-timing-function' :
    {
        validator : isArray,
        msg : 'Animation timing function must be an array',
        subValidator : ['timing']
    },

    'animation-iteration-count' :
    {
        validator : isArray,
        msg : 'Animation iteration count must be an array',
        subValidator : ['iterationCount']
    },

    'name' :
    {
        validator : isNonEmptyString,
        msg : 'Name must be a defined string'
    },

    'props' :
    {
        validator : isPlainObject,
        msg : 'Props must be an object'
    },

    'marker' :
    {
        validator : isMarker,
        iterator  : validateArray,
        msg : 'Marker must be from, to or a string value with percent'
    },

    'delay' :
    {
        validator : isTime,
        iterator  : validateArray,
        msg : 'Animation delays must be a string of numbers followed by s or ms'
    },

    'direction' :
    {
        validator : isDirection,
        iterator  : validateArray,
        msg : 'Animation direction must be one of normal, reverse, alternate, alternate-reverse, inherit, initial or unset'
    },

    'duration' :
    {
        validator : isTime,
        iterator  : validateArray,
        msg : 'Animation duration must be a string of numbers followed by s or ms'
    },

    'fillMode' :
    {
        validator : isFillMode,
        iterator  : validateArray,
        msg : 'Animation fill mode must be one of both, none, forwards or backwards'
    },

    'playState' :
    {
        validator : isPlayState,
        iterator  : validateArray,
        msg : 'Animation play state must be one of running, paused, inherit, initial or unset'
    },

    'timing' :
    {
        validator : isTiming,
        iterator  : validateArray,
        msg : 'Animation timing function must be a cubic bezier or step function or one of ease, ease-in, ease-out, ease-in-out, linear, step-start, step-end, initial, inherit or unset'
    },

    'iterationCount' :
    {
        validator : isIterationCount,
        iterator  : validateArray,
        msg : 'Animation iteration count must be infinite or a string of finite numbers'
    },

    'requiredStrings' :
    {
        validator : isNonEmptyString,
        iterator  : validateArray,
        msg : 'Required string values'
    },

    'requiredLength' :
    {
        validator : isNonEmptyArray,
        msg : 'Required values'
    },

    'innerIndent' :
    {
        validator : isFinite
    },

    'outerIndent' :
    {
        validator : isFinite
    },

    'rpad' :
    {
        validator : isFinite
    },

    'state' :
    {
        validator : isPlainObject,
        msg : 'State must be a plain object'
    },

    'options' :
    {
        validator : isPlainObject,
        msg : 'Options must be a plain object'
    },

    'shorthand' :
    {
        validator : isBoolean,
        msg : 'Shorthand must be a boolean'
    }

};


/**
* Returns the validators associated with the prop. Throws errors if there is no
* validator for the prop or if the validator or iterator is not a function.
*
* @param {String}                prop                    prop to validate
* @param {Boolean}               useSubValidator         true, if subValidators will be used
*
* @return {Function|Array}                               validator or array of validator objects
*/
export const getValidator = ( prop, useSubValidator ) =>
{
    if( ! validation[prop] ) throw new Error( info.validation );

    let validator = validation[prop].validator;

    if( ! isFunction( validator ) ) throw new Error( info.validator );

    const iterator = validation[prop].iterator;

    if( iterator )
    {
        if( ! isFunction( iterator ) ) throw new Error( info.iterator );

        validator = iterator( validator );
    }

    if( useSubValidator )
    {
        const subValidator  = validation[prop].subValidator || [];
        const subValidators = subValidator.map( subProp =>
        {
            return { prop : subProp, validator : getValidator( subProp ) }
        } );

        return [ ...subValidators, { prop, validator }];
    }

    return validator;
};