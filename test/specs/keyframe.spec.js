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
        expect( keyframe ).to.have.keys( 'getState', 'setState', 'getErrors', 'getName',
        'getMarkers', 'getProps', 'setName', 'setMarkers', 'setProps' );
    } );

    it( 'should set the name, markers and props of the current keyframe in the state, if passed in the options', () =>
    {
        const options       = { name : 'John', markers : ['10%'] };
        const testKeyframe  = Keyframe();
        const setState      = testKeyframe.setState( options );
        const keyframeState = testKeyframe.getState();

        expect( keyframeState.name ).to.equal( 'John' );
        expect( keyframeState.markers ).to.eql( ['10%'] );
        expect( keyframeState.props ).to.eql( {} );
        expect( setState ).to.be.undefined;
    } );

    it( 'should return the current state of the keyframe', () =>
    {
        const state = keyframe.getState();
        expect( state ).to.eql( { name : '', markers : [], props : {} } );
    } );

    it( 'should get a name from the state', () =>
    {
        const options      = { name : 'Joppe' };
        const testKeyframe = Keyframe();
        const setState     = testKeyframe.setState( options );

        testKeyframe.setState( options );

        expect( testKeyframe.getName() ).to.equal( 'Joppe' );
        expect( setState ).to.be.undefined;
    } );

    it( 'should set a valid name in the state', () =>
    {
        let setName = keyframe.setName( 9 );
        expect( keyframe.getName() ).to.equal( '' );
        expect( setName ).to.eql( { errors : [ { prop: 'name', msg: 'Name must be a defined string', val: 9 } ] } );

        setName = keyframe.setName( 'Kristina' );
        expect( keyframe.getName() ).to.equal( 'Kristina' );
        expect( setName ).to.be.undefined;
    } );

    it( 'should get markers from the state', () =>
    {
        const options      = { markers : ['20%', '35%'] };
        const testKeyframe = Keyframe();
        const setState     = testKeyframe.setState( options );

        expect( testKeyframe.getMarkers() ).to.eql( ['20%', '35%'] );
        expect( setState ).to.be.undefined;
    } );

    it( 'should set valid markers in the state', () =>
    {
        let setMarkers = keyframe.setMarkers( [25] );
        expect( keyframe.getMarkers() ).to.eql( [] );
        expect( setMarkers ).to.eql( { errors : [ { prop: 'marker', msg: 'Marker must be from, to or a string value with percent', val: [25] } ] } );

        setMarkers = keyframe.setMarkers( [25, '25%'] );
        expect( keyframe.getMarkers() ).to.eql( [] );
        expect( setMarkers ).to.eql( { errors : [ { prop: 'marker', msg: 'Marker must be from, to or a string value with percent', val: [25, '25%'] } ] } );

        setMarkers = keyframe.setMarkers( ['25%'] );
        expect( keyframe.getMarkers() ).to.eql( ['25%'] );
        expect( setMarkers ).to.be.undefined;
    } );

    it( 'should get props from the state', () =>
    {
        const options = { props : { width : '10px', height : '12px' } };
        const testKeyframe = Keyframe();
        testKeyframe.setState( options );

        expect( testKeyframe.getProps() ).to.eql( { width : '10px', height : '12px' } );
    } );

    it( 'should set props in the state', () =>
    {
        keyframe.setProps( { display : 'block', backgroundColor : 'red' } );
        expect( keyframe.getProps() ).to.eql( { display : 'block', backgroundColor : 'red' } );

        keyframe.setProps( { display : 'inline-block', width : '10px' } );
        expect( keyframe.getProps() ).to.eql( { display : 'inline-block', width : '10px', backgroundColor : 'red' } );
    } );

} );