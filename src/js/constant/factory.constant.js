
/**
* Rule factory mapping
*
* @property {String}         mapping.<method suffix>       state property
*/
export const rule =
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
* keyframe factory mapping for keyframe factory
*
* @property {String}         mapping.<method suffix>        state property
*/
export const keyframe =
{
    Markers : 'markers',
    Name    : 'name',
    Props   : 'props'
};


/**
* Keys of the rule factory mapping
*
* @typedef {Array}
*/
const ruleKeys = Object.keys( rule );


/**
* Keys of the keyframe factory mapping
*
* @typedef {Array}
*/
const keyframeKeys = Object.keys( keyframe );


/**
* Setter method suffixes
*
* @property {Array}         mapping.<factory type>       setter suffixes
*/
export const setter =
{
    rule     : [ ...ruleKeys],
    keyframe : ['Markers', 'Name']
};


/**
* Getter method suffixes
*
* @property {Array}         mapping.<factory type>        setter suffixes
*/
export const getter =
{
    rule     : [ ...ruleKeys],
    keyframe : [ ...keyframeKeys]
};