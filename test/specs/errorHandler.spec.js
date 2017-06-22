import Factory from 'factory/factory';
import ErrorHandler from 'factory/errorHandler';


describe( 'Error Handler Factory', () =>
{

    let errorHandler, errors1, errors2;

    beforeEach( () =>
    {
        errors1 = { errors :
        [
            { prop : 'banana', msg : 'I am bruised', val : 0 },
            { prop : 'banana', msg : 'I am too ripe', val : 1 }
        ] };
        errors2 = { errors : [{ prop : 'strawberry', msg : 'I am moldy', val : [1] }] };

        errorHandler = ErrorHandler( errors1 );
    } );

    it( 'should get the error handler state', () =>
    {
        expect( errorHandler.get() ).to.eql( errors1 );
    } );

    it( 'should set errors states in the error handler', () =>
    {
        errorHandler.set( errors2 );
        expect( errorHandler.get() ).to.eql( { errors :
        [
            { prop : 'banana', msg : 'I am bruised', val : 0 },
            { prop : 'banana', msg : 'I am too ripe', val : 1 },
            { prop : 'strawberry', msg : 'I am moldy', val : [1] }]
        } );
    } );

    it( 'should return a boolean describing if the handler state has errors', () =>
    {
        expect( errorHandler.hasErrors() ).to.be.true;

        const errorHandler2 = ErrorHandler();
        expect( errorHandler2.hasErrors() ).to.be.false;
    } );

    it( 'should return remove an error from the handler state', () =>
    {
        errorHandler.remove( 'banana' );
        expect( errorHandler.hasErrors() ).to.be.false;
    } );

    it( 'should add an error to the handler state', () =>
    {
        errorHandler.add( 'name', 9 );
        expect( errorHandler.get() ).to.eql( { errors :
        [
            { prop : 'banana', msg : 'I am bruised', val : 0 },
            { prop : 'banana', msg : 'I am too ripe', val : 1 },
            { prop : 'name', msg : 'Name must be a defined string', val : 9 }]
        } );
    } );

    it( 'should handle new errors by removing existing errors and adding new ones if val is not valid', () =>
    {
        errorHandler.handle( 'banana', 2, true );
        expect( errorHandler.hasErrors() ).to.be.false;

        errorHandler.handle( 'name', 9, false );
        expect( errorHandler.hasErrors() ).to.be.true;
    } );

} );