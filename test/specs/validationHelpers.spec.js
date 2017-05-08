import
{
    isPercent,
    isFromTo,
    isMarker,
    validateArray

} from 'util/validator/validatorHelpers';


describe( 'Validation helpers', () =>
{

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

    it( 'should return true if every item in the array is valid', () =>
    {
        expect( validateArray( 'marker', ['10%', '12%'] ) ).to.be.true;
        expect( validateArray( 'marker', [10, '12%'] ) ).to.be.false;
    } );
} );


