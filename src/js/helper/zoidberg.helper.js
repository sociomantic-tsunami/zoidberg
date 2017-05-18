import isEmpty from 'lodash/isEmpty';
import isMatch from 'lodash/isMatch';


/**
* Finds collection items which have a state that fulfills key/value matches
* of the search state passed to the function. Partial matching for values that
* are objects ie. if the value is an array, will be a match if the array to
* which it is compared contains one or more of the same items as it does.
*
* @param {Object}           search state          search state to compare
* @param {Array}            collection            collection to search
*
* @return {Array}                                 found rules
*/
export const find = ( searchState = {}, collection ) =>
{
    if( isEmpty( searchState ) ) return [];

    return collection.filter( factory =>
    {
        const state = factory.getState();
        const match = isMatch( state, searchState );

        if( match ) return factory;
    } );
};


/**
* Removes factories from a collection. Returns the number of removed factories
* and the collection of remaining factories.
*
* @param {Array}            removables            factories to be removed
* @param {Array}            collection            collection to remove factories from
*
* @return   {Object}                              result
* @property {Number}        result.removed        number of removed factories
* @property {Array}         result.remaining      collection of remaining factories
*/
export const remove = ( removables, collection ) =>
{
    const oldLength = collection.length;
    const remaining = collection.filter( factory =>
    {
        if( ! removables.includes( factory ) ) return factory;
    } );
    const removed = oldLength - remaining.length;

    return { removed, remaining };
};