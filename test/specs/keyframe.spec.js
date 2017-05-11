import Keyframe from 'factory/keyframe';


describe( 'Keyframe factory', () =>
{
    let keyframe;

    beforeEach( () =>
    {
        keyframe = Keyframe();
    } );

    it( 'should have get and set methods for the state', () =>
    {
        expect( keyframe ).to.be.an( 'object' );
        expect( keyframe ).to.have.keys( 'getKeyframe', 'getErrors', 'getName', 'getMarkers', 'getProps', 'setName', 'setMarkers', 'setProps' );
    } );

    it( 'should set the name, markers and props of the current keyframe in the state, if passed in the options', () =>
    {
        const options = { name : 'John', markers : ['10%'] };
        const testKeyframe = Keyframe( options );
        const keyframeState = testKeyframe.getKeyframe()

        expect( keyframeState.name ).to.equal( 'John' );
        expect( keyframeState.markers ).to.eql( ['10%'] );
        expect( keyframeState.props ).to.eql( {} );
    } );

    it( 'should return the current state of the keyframe', () =>
    {
        const state = keyframe.getKeyframe();
        expect( state ).to.eql( { name : '', markers : [], props : {} } );
    } );

    it( 'should get a name from the state', () =>
    {
        const options = { name : 'Joppe' };
        const testKeyframe = Keyframe( options );

        expect( testKeyframe.getName() ).to.equal( 'Joppe' );
    } );

    it( 'should set a valid name in the state', () =>
    {
        keyframe.setName( 9 );
        expect( keyframe.getName() ).to.equal( '' );

        keyframe.setName( 'Kristina' );
        expect( keyframe.getName() ).to.equal( 'Kristina' );
    } );

    it( 'should get markers from the state', () =>
    {
        const options = { markers : ['20%', '35%'] };
        const testKeyframe = Keyframe( options );

        expect( testKeyframe.getMarkers() ).to.eql( ['20%', '35%'] );
    } );

    it( 'should set valid markers in the state', () =>
    {
        keyframe.setMarkers( [25] );
        expect( keyframe.getMarkers() ).to.eql( [] );

        keyframe.setMarkers( [25, '25%'] );
        expect( keyframe.getMarkers() ).to.eql( [] );

        keyframe.setMarkers( ['25%'] );
        expect( keyframe.getMarkers() ).to.eql( ['25%'] );
    } );

    it( 'should get props from the state', () =>
    {
        const options = { props : { width : '10px', height : '12px' } };
        const testKeyframe = Keyframe( options );

        expect( testKeyframe.getProps() ).to.eql( { width : '10px', height : '12px' } );
    } );

    it( 'should set props in the state', () =>
    {
        keyframe.setProps( { display : 'block', backgroundColor : 'red' } );
        expect( keyframe.getProps() ).to.eql( { display : 'block', backgroundColor : 'red' } );

        keyframe.setProps( { display : 'inline-block', width : '10px' } );
        expect( keyframe.getProps() ).to.eql( { display : 'inline-block', width : '10px', backgroundColor : 'red' } );
    } );

    it( 'should get errors from the state', () =>
    {
        keyframe.setName( 25 );
        expect( keyframe.getErrors() ).to.eql( [ { prop : 'name', val : 25, msg : 'Name must be a string' } ] );
    } );

} );