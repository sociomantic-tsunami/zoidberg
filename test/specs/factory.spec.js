import Factory from 'factory/factory';


describe( 'Base Factory', () =>
{
    let factory, subFactory, state;

    beforeEach( () =>
    {
        state = {};
        subFactory = ( state, set, get, valid ) =>
        {
            const getState = () => { return state };

            return { get, set, valid, getState }
        };

        // state, subFactory, options
        factory = Factory( state, subFactory );
    } );

    it( 'should set a deeply cloned value in the state', () =>
    {
        factory.set( 'name', 'Joppe' );
        expect( factory.getState() ).to.eql( { name : 'Joppe' } );

        const testObj = { a : 'apple' };
        factory.set( 'object', testObj );
        testObj.a = 'aardvark';
        expect( factory.getState() ).to.eql( { name : 'Joppe', object : { a : 'apple' } } );
    } );

    it( 'should get a deeply cloned value from the state', () =>
    {
        state   = { nested : [ { nested : { nested : 'I am so nested', array : [] } } ] };
        factory = Factory( state, subFactory );

        const currentState = factory.get( 'nested' );
        currentState[0].nested.array.push( 'har' );
        expect( factory.getState() ).to.eql( { nested : [ { nested : { nested : 'I am so nested', array : [] } } ] } );
    } );

    it( 'should set any new errors in the state and returns a boolean', () =>
    {
        state   = { errors : [] };
        factory = Factory( state, subFactory );

        expect( factory.valid( 'name', 1 ) ).to.be.false;
        expect( factory.getState() ).to.eql( { errors : [ { prop : 'name', val : 1, msg : 'Name must be a string' } ] } );
        expect( factory.valid( 'name', 'Zsolt' ) ).to.be.true;
        expect( factory.getState() ).to.eql( { errors : [] } );
    } );

} );