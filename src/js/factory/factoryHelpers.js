export const addGenericMethods = function ( method, set, get )
{
	const methods =
	{
		getErrors : () =>
	    {
	        return get( 'errors' );
	    }
	};

	for( let i in method )
	{
		if( method.hasOwnProperty( i ) )
		{
			methods['set' + i] = ( value ) =>
			{
				if( valid( method[i].type, value ) && valid( method[i].itemType, value ) )
				{
					set( method[i].prop, value );
				}
			};

			methods['get' + i] = ( value ) =>
			{
				return get( method[i].prop );
			}
		}
	}

	return methods;
};