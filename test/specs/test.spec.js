describe( 'Test test', function()
{
    beforeEach( function()
    {
        console.log( 'I am the test!' )
    } );

    it( 'should be a test that runs', function()
    {
        const isTest = true;

        expect( isTest ).to.be.true;
    } );

} );


