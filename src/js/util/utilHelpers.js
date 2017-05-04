import { isArray, isObject, isShallowCopy } from 'util/validator/validatorHelpers';


/**
* Clones nested objects.
*
* @param any                    prop                        prop to be cloned
*
* @return any                                               clone
*/
export const cloneDeep = function( prop )
{
    let clone = prop;

    if( isArray( prop ) )
    {
        clone = [];

        for( let i=0; i<prop.length; i++ )
        {
            let val = isShallowCopy( prop[i] ) ? cloneDeep( prop[i] ) : prop[i];
            clone.push( val );
        }
    }

    if( isObject( prop ) )
    {
        clone = {};

        for( let i in prop )
        {
            if( prop.hasOwnProperty( i ) )
            {
                let val  = isShallowCopy( prop[i] ) ? cloneDeep( prop[i] ) : prop[i];
                clone[i] = val;
            }
        }
    }

    return clone;
}