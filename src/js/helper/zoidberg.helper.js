/**
* This file is part of Zoidberg <https://github.com/sociomantic-tsunami/zoidberg/>
* Copyright (c) 2017 dunnhumby Germany GmbH.
* MIT License. See accompanying LICENSE.txt for details.
*/


import isEmpty from 'lodash/isEmpty';
import isMatch from 'lodash/isMatch';
import { validate } from 'util/validator.js';


/**
* Finds collection items which have a state that fulfills key/value matches
* of the search state passed to the function. Partial matching for values that
* are objects ie. if the value is an array, will be a match if the array to
* which it is compared contains one or more of the same items as it does.
*
* @param {Object}           searchState           state to search for
* @param {Array}            collection            collection to search
*
* @return {Array}                                 found rules
*/
export const find = ( searchState, collection ) =>
{
    if( ! searchState ) return [ ...collection];

    const validSearch = validate( 'state', searchState );

    if( ! validSearch || isEmpty( searchState ) ) return [];

    return collection.filter( factory =>
    {
        const state = factory.getState();
        const match = isMatch( state, searchState );

        if( match ) return factory;
    } );
};


/**
* Removes factories from a collection. Returns the state of the removed factories
* and the collection of remaining factories.
*
* @param {Object}           searchState           state to search for
* @param {Array}            collection            collection to remove factories from
*
* @return   {Object}                              result
* @property {Array}         result.removed        state of removed factories
* @property {Array}         result.remaining      collection of remaining factories
*/
export const remove = ( searchState, collection ) =>
{
    const removables = find( searchState, collection );
    const remaining  = collection.filter( factory => ! removables.includes( factory ) );
    const removed    = removables.map( factory => factory.getState() );

    return { removed, remaining };
};