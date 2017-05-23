import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
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
* Iterator callback mapping
*
* @property {callbackFn}         mapping.<prop>          iterator callback
*/
export const iteration =
{
    'marker'          : validateArray,
    'delay'           : validateArray,
    'direction'       : validateArray,
    'duration'        : validateArray,
    'fillMode'        : validateArray,
    'playState'       : validateArray,
    'timing'          : validateArray,
    'iterationCount'  : validateArray,
    'requiredStrings' : validateArray
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
        msg : 'Marker must be from, to or a string value with percent'
    },

    'delay' :
    {
        validator : isTime,
        msg : 'Animation delays must be a string of numbers followed by s or ms'
    },

    'direction' :
    {
        validator : isDirection,
        msg : 'Animation direction must be one of normal, reverse, alternate, alternate-reverse, inherit, initial or unset'
    },

    'duration' :
    {
        validator : isTime,
        msg : 'Animation duration must be a string of numbers followed by s or ms'
    },

    'fillMode' :
    {
        validator : isFillMode,
        msg : 'Animation fill mode must be one of both, none, forwards or backwards'
    },

    'playState' :
    {
        validator : isPlayState,
        msg : 'Animation play state must be one of running, paused, inherit, initial or unset'
    },

    'timing' :
    {
        validator : isTiming,
        msg : 'Animation timing function must be a cubic bezier or step function or one of ease, ease-in, ease-out, ease-in-out, linear, step-start, step-end, initial, inherit or unset'
    },

    'iterationCount' :
    {
        validator : isIterationCount,
        msg : 'Animation iteration count must be infinite or a string of finite numbers'
    },

    'requiredStrings' :
    {
        validator : isNonEmptyString,
        msg : 'Required string values'
    },

    'requiredLength' :
    {
        validator : isNonEmptyArray,
        msg : 'Required values'
    }

};