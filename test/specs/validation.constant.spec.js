import { validation, getValidators, info } from 'constant/validation.constant';


describe( 'Validation constants', () =>
{

    let entries;

    beforeEach( () =>
    {
        entries = Object.entries( validation );
    } );

    it( 'should have validation objects', () =>
    {
        expect( Object.keys( validation ) ).to.have.length( 25 );
    } );

    it( 'should each have a validator function', () =>
    {
        const validators = entries.filter( pair => typeof pair[1].validator === 'function' );

        expect( validators ).to.have.length( 25 );
    } );

    it( 'should each have a validator message', () =>
    {
        const messages = entries.filter( pair => pair[1].msg );

        expect( messages ).to.have.length( 21 );
    } );

    describe( 'info', () =>
    {

        it( 'should have validator and prop keys', () =>
        {
            expect( info ).to.have.keys( 'validator', 'validation' );
        } );

        it( 'should have a message for each key', () =>
        {
            const entries = Object.entries( info );
            const messages = entries.filter( pair => typeof pair[1] === 'string' );

            expect( messages ).to.have.length( 2 );
        } );

    } );

} );