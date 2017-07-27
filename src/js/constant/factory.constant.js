/**
* This file is part of Zoidberg <https://github.com/sociomantic-tsunami/zoidberg/>
* Copyright (c) 2017 sociomantic labs GmbH.
* MIT License. See accompanying LICENSE.txt for details.
*/


/**
* Rule factory mapping
*
* @property {String}         mapping.<method suffix>       state property
*/
export const ruleMap =
{
    Delay          : 'animation-delay',
    Direction      : 'animation-direction',
    Duration       : 'animation-duration',
    FillMode       : 'animation-fill-mode',
    Name           : 'animation-name',
    PlayState      : 'animation-play-state',
    Timing         : 'animation-timing-function',
    IterationCount : 'animation-iteration-count'
};


/**
* Keyframe factory mapping
*
* @property {String}         mapping.<method suffix>        state property
*/
export const keyframeMap =
{
    Markers : 'markers',
    Name    : 'name',
    Props   : 'props'
};


/**
* Keys of the Rule factory mapping
*
* @typedef {Array}
*/
const ruleKeys = Object.keys( ruleMap );


/**
* Keys of the Keyframe factory mapping
*
* @typedef {Array}
*/
const keyframeKeys = Object.keys( keyframeMap );


/**
* Setter method suffixes
*
* @property {Array}         mapping.<factory type>       setter suffixes
*/
export const ruleSetter = [ ...ruleKeys];
export const keyframeSetter = ['Markers', 'Name'];


/**
* Getter method suffixes
*
* @property {Array}         mapping.<factory type>       setter suffixes
*/
export const ruleGetter = [ ...ruleKeys];
export const keyframeGetter = [ ...keyframeKeys]
