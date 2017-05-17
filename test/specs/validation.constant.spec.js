import { validation, getValidators } from 'constant/validation.constant';


describe( 'Validation constants', () =>
{

    let entries;

    beforeEach( () =>
    {
        entries = Object.entries( validation );
    } );

    it( 'should have validation objects', () =>
    {
        expect( Object.keys( validation ) ).to.have.length( 21 );
    } );

    it( 'should each have a validator function', () =>
    {
        const validators = entries.filter( pair => typeof pair[1].validator === 'function' );

        expect( validators ).to.have.length( 21 );
    } );

    it( 'should each have a validator message', () =>
    {
        const messages = entries.filter( pair => pair[1].msg );

        expect( messages ).to.have.length( 21 );
    } );

    it( 'should return the name of the prop and its subvalidators', () =>
    {
        expect( getValidators( 'markers' ) ).to.eql( ['marker', 'markers'] );
    } );

} );