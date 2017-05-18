import Factory from 'factory/factory';


describe( 'Base Factory', () =>
{

    let factory, subFactory, state;

    beforeEach( () =>
    {
        state = {};
        subFactory = ( set, get, valid, getErrors ) =>
        {
            const getState = () => state;

            return { get, set, valid, getErrors, getState }
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

    it( 'should validate a prop by setting any new errors in the state and returning a boolean', () =>
    {
        state   = { errors : [] };
        factory = Factory( state, subFactory );

        expect( factory.valid( 'name', 1 ) ).to.be.false;
        expect( factory.getErrors() ).to.eql( [ { prop : 'name', msg : 'Name must be a defined string', val : 1 } ] );
        expect( factory.valid( 'name', 'Zsolt' ) ).to.be.true;
        expect( factory.getErrors() ).to.be.undefined;
        expect( factory.valid( 'animation-name', [] ) ).to.be.false;
        expect( factory.getErrors() ).to.eql( [ { prop: 'requiredLength', msg: 'Required values', val: [] } ] );
        expect( factory.valid( 'animation-name', [1] ) ).to.be.false;
        expect( factory.getErrors() ).to.eql( [ { prop: 'requiredStrings', msg: 'Required string values', val: [1] } ] );
        expect( factory.valid( 'animation-name', ['bounce'] ) ).to.be.true;
        expect( factory.getErrors() ).to.be.undefined;
    } );

} );