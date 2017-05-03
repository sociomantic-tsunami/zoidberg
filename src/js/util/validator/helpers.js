export const isArray = function ( val )
{
	return toString.call( val ) === '[object Array]';
}


export const isObject = function ( val )
{
	return toString.call( val ) === '[object Object]';
}


export const isString = function ( val )
{
	return typeof val === 'string';
}


export const isFunction = function ( val )
{
	return typeof val === 'function';
}


export const isPercent = function( val )
{
	return isString( val ) && val.includes( '%' );
}


export const isFromTo = function( val )
{
	return isString( val ) && ( val.includes( 'from' ) || val.includes( 'to' ) );
}


export const isMarker = function ( val )
{
	return isPercent( val ) || isFromTo( val );
}

export const isShallowCopy = function ( val )
{
	return isArray( val ) || isObject( val );
}