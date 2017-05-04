import
{
    isArray,
    isObject,
    isString,
    isFunction,
    isPercent,
    isFromTo,
    isMarker,
    isShallowCopy

} from 'util/validator/validatorHelpers';


describe( 'Validation helpers', () =>
{

    it( 'should return true if value is an array', () =>
    {
		expect( isArray( [] ) ).to.be.true;
		expect( isArray( {} ) ).to.be.false;
    } );

    it( 'should return true if value is an object literal', () =>
    {
        expect( isObject( {} ) ).to.be.true;
        expect( isObject( [] ) ).to.be.false;
    } );

    it( 'should return true if value is a shallow copy', () =>
    {
        expect( isShallowCopy( [] ) ).to.be.true;
        expect( isShallowCopy( {} ) ).to.be.true;
        expect( isShallowCopy( 2 ) ).to.be.false;
    } )

    it( 'should return true if value is a string', () =>
    {
        expect( isString( 'I am the string' ) ).to.be.true;
        expect( isObject( 9 ) ).to.be.false;
    } );

    it( 'should return true if value is a function', () =>
    {
        expect( isFunction( () => {} ) ).to.be.true;
        expect( isFunction( 'I am not a function hehe' ) ).to.be.false;
    } );

    it( 'should return true if value string with a percent', () =>
    {
        expect( isPercent( '10%' ) ).to.be.true;
        expect( isPercent( '10' ) ).to.be.false;
        expect( isPercent( 10 ) ).to.be.false;
    } );

    it( 'should return true if value string which contains from or to', () =>
    {
        expect( isFromTo( 'from' ) ).to.be.true;
        expect( isFromTo( 'to' ) ).to.be.true;
        expect( isFromTo( '10' ) ).to.be.false;
        expect( isFromTo( 10 ) ).to.be.false;
    } );

    it( 'should return true if value is a valid marker', () =>
    {
        expect( isMarker( '10%' ) ).to.be.true;
        expect( isMarker( 'to' ) ).to.be.true;
        expect( isMarker( '10' ) ).to.be.false;
        expect( isMarker( 10 ) ).to.be.false;
    } );

} );


