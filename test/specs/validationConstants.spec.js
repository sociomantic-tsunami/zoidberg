import validation from 'constant/validation';


describe( 'Validation constants', () =>
{
    let entries;

    beforeEach( () =>
    {
        entries = Object.entries( validation );
    } );

    it( 'should have validation objects', () =>
    {
        expect( Object.keys( validation ) ).to.have.length( 4 );
        expect( validation ).to.have.keys( 'marker', 'name', 'props', 'markers' );
    } );

    it( 'should each have a validator function', () =>
    {
        const validators = entries.filter( pair => typeof pair[1].validator === 'function' );

        expect( validators ).to.have.length( 4 );
    } );

    it( 'should each have a validator message', () =>
    {
        const messages = entries.filter( pair => pair[1].msg );

        expect( messages ).to.have.length( 4 );
    } );

} );


