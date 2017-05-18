import
{
    isPercent,
    isFromTo,
    isMarker,
    isTime,
    isDirection,
    isFillMode,
    isPlayState,
    isTiming,
    isIterationCount,
    isCubicBezier,
    isSteps,
    validateArray,
    isNonEmptyString,
    isNonEmptyArray
} from 'helper/validator.helper';


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

    it( 'should return true if value is a valid time', () =>
    {
        expect( isTime( '1ms' ) ).to.be.true;
        expect( isTime( '-1ms' ) ).to.be.true;
        expect( isTime( '1 ms' ) ).to.be.false;
        expect( isTime( '1' ) ).to.be.false;
        expect( isTime( 10 ) ).to.be.false;
    } );

    it( 'should return true if value is a valid direction', () =>
    {
        expect( isDirection( 'normal' ) ).to.be.true;
        expect( isDirection( 'forward' ) ).to.be.false;
        expect( isDirection( 1 ) ).to.be.false;
    } );

    it( 'should return true if value is a valid fill mode', () =>
    {
        expect( isFillMode( 'none' ) ).to.be.true;
        expect( isFillMode( 'upwards' ) ).to.be.false;
        expect( isFillMode( 15 ) ).to.be.false;
    } );

    it( 'should return true if value is a valid play state', () =>
    {
        expect( isPlayState( 'running' ) ).to.be.true;
        expect( isPlayState( 'stopped' ) ).to.be.false;
        expect( isPlayState( {} ) ).to.be.false;
    } );

    it( 'should return true if value is a valid timing', () =>
    {
        expect( isTiming( 'ease' ) ).to.be.true;
        expect( isTiming( 'cubic-bezier( 1.0, 2 )' ) ).to.be.true;
        expect( isTiming( 'steps( 1, end )' ) ).to.be.true;
        expect( isTiming( 'ease-up' ) ).to.be.false;
        expect( isTiming( [] ) ).to.be.false;
    } );

    it( 'should return true if value is a valid iteration count', () =>
    {
        expect( isIterationCount( 'infinite' ) ).to.be.true;
        expect( isIterationCount( 'infinite 8' ) ).to.be.false;
        expect( isIterationCount( Infinity ) ).to.be.false;
    } );

    it( 'should return true if value is a valid cubic bezier function', () =>
    {
        expect( isCubicBezier( 'cubic-bezier( 1.0, 2 )' ) ).to.be.true;
        expect( isCubicBezier( 'cubic-bezier( 1.0, 2' ) ).to.be.false;
        expect( isCubicBezier( 'cubic-bezier(' ) ).to.be.false;
        expect( isCubicBezier( 'cubic-bezier( Infinity )' ) ).to.be.false;
        expect( isCubicBezier( 'cubic-bezier( har )' ) ).to.be.false;
        expect( isCubicBezier( 'cubic-bezier( 1.0, har )' ) ).to.be.false;
    } );

    it( 'should return true if value is a valid step function', () =>
    {
        expect( isSteps( 'steps( 1, 2 )' ) ).to.be.true;
        expect( isSteps( 'steps( start, 2 )' ) ).to.be.true;
        expect( isSteps( 'steps( 1, end )' ) ).to.be.true;
        expect( isSteps( 'steps( start, end )' ) ).to.be.true;
        expect( isSteps( 'steps( 1, 2' ) ).to.be.false;
        expect( isSteps( 'steps( 1.1, 2 )' ) ).to.be.false;
        expect( isSteps( 'steps(' ) ).to.be.false;
        expect( isSteps( 'steps( Infinity )' ) ).to.be.false;
        expect( isSteps( 'steps( har )' ) ).to.be.false;
        expect( isSteps( 'steps( 1, har )' ) ).to.be.false;
    } );

    it( 'should return true if all elements in an array are valid ', () =>
    {
        expect( validateArray( 'marker', ['10%', '20%'] ) ).to.be.true;
        expect( validateArray( 'marker', ['10%', 0] ) ).to.be.false;
    } );

    it( 'should return true if value is a non empty string', () =>
    {
        expect( isNonEmptyString( 9 ) ).to.be.false;
        expect( isNonEmptyString( '' ) ).to.be.false;
        expect( isNonEmptyString( 'har' ) ).to.be.true;
    } );

    it( 'should return true if value is a non empty array', () =>
    {
        expect( isNonEmptyArray( {} ) ).to.be.false;
        expect( isNonEmptyArray( [] ) ).to.be.false;
        expect( isNonEmptyArray( ['har'] ) ).to.be.true;
        expect( isNonEmptyArray( [1,2] ) ).to.be.true;
    } );
} );