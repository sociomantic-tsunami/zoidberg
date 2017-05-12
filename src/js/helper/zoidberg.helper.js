/**
* Finds collection items which have a state that fulfills key/value matches
* of the rule state passed to the function. Partial matching for values that
* are objects ie. if the value is an array, will be a match if the array to
* which it is compared contains one or more of the same items as it does.
*
* @param {Object}           rule state            rule state to compare
* @param {Array}            collection            collection to search
*
* @return {Array}                                 found rules
*/
export const find = ( state = {}, collection ) =>
{
    if( isEmpty( state ) ) return [];

    return collection.filter( factory =>
    {
        const state = factory.getState();
        const match = isMatch( state, ruleState );

        if( match ) return rule;
    } );
};