export const isArray = val =>
{
	return toString.call( val ) === '[object Array]';
}


export const isObject = val =>
{
	return toString.call( val ) === '[object Object]';
}


export const isString = val =>
{
	return typeof val === 'string';
}


export const isFunction = val =>
{
	return typeof val === 'function';
}


export const isPercent = val =>
{
	return isString( val ) && val.includes( '%' );
}


export const isFromTo = val =>
{
	return isString( val ) && ( val.includes( 'from' ) || val.includes( 'to' ) );
}


export const isMarker = val =>
{
	return isPercent( val ) || isFromTo( val );
}

export const isShallowCopy = val =>
{
	return isArray( val ) || isObject( val );
}