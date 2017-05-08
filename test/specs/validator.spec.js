import { validate, getErrorState } from 'util/validator/validator';


describe( 'Validator', () =>
{
    describe( 'validate', () =>
    {
        it( 'should throw an error if the validator is not a function', () =>
        {
            expect( () => { validate( 'date', 'today' ) } ).to.throw( Error, 'Validator does not exist' );
        } );

        it( 'should return a boolean regarding the outcome of validation', () =>
        {
            expect( validate( 'name', 'I am a name' ) ).to.be.true;
            expect( validate( 'name', 9 ) ).to.be.false;
        } );
    } );

    describe( 'getErrorState', () =>
    {
        let oldErrors;

        beforeEach( () =>
        {
            oldErrors =
            [
                { prop : 'name',   val : 9, msg : 'Name must be a string' } ,
                { prop : 'markers', val : '10', msg : 'Markers must be an array' }
            ];
        } );

        it( 'If prop is valid, should return an object that has valid set as true and an errors array with related errors removed', () =>
        {
            const state = getErrorState( 'name', 'Jolene', oldErrors );

            expect( state.errors ).to.have.length( 1 );
            expect( state.valid ).to.be.true;
        } );

        it( 'If prop is invalid, should return an object that has valid set as false and an errors array with related errors added', () =>
        {
            const state = getErrorState( 'markers', '11%', oldErrors );

            expect( state.errors ).to.have.length( 3 );
            expect( state.valid ).to.be.false;
        } );
    } );

} );


