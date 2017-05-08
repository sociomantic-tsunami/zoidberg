import { isMarker, validateArray } from 'util/validator/validatorHelpers';
import { isArray, isString, isPlainObject } from 'lodash';


export const regex =
{
	percent : /^([0-9]+(%))$/
}


export const iteration =
{
	'marker' : validateArray
}


export const validation =
{
	marker :
	{
		validator : isMarker,
		msg : 'Marker must be from, to or a string value with percent',
	},

	markers :
	{
		validator : isArray,
		msg : 'Markers must be an array'
	},

	name :
	{
		validator : isString,
		msg : 'Name must be a string'
	},

	props :
	{
		validator : isPlainObject,
		msg : 'Props must be an object'
	}
}