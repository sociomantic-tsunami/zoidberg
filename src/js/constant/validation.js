import
{
	isMarker,
	isString,
	isObject,
	isArray
} from 'util/validator/helpers';


export default
{
	marker :
	{
		validator : isMarker,
		msg : 'Marker must be from, to or a string value with percent'
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
		validator : isObject,
		msg : 'Props must be an object'
	}
}