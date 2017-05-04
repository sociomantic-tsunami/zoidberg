import KeyFrame from 'factory/keyframe';


describe( 'Keyframe factory', () =>
{
    let keyframe;

    beforeEach( () =>
    {
        // keyframe = Keyframe();
    } );

    it( 'should make a keyframe', () =>
    {
        debugger;
        const tests = KeyFrame();

        tests.getKeyframe();
    } )

    // it( 'should be initialized with a default state', () =>
    // {
    //     expect( keyframe.state ).to.be.an( 'object' );
    //     expect( keyframe.state ).to.have.keys( 'name', 'props', 'markers', 'errors' );
    //     expect( keyframe.state.name ).to.be.a( 'string' );
    //     expect( keyframe.state.props ).to.be.an( 'object' );
    //     expect( keyframe.state.markers ).to.be.an( 'array' );
    //     expect( keyframe.state.errors ).to.be.an( 'array' );
    // } );

    // it( 'should set a value in the state if that prop exists', () =>
    // {
    //     keyframe.set( 'name', 'Joppe' );
    //     expect( keyframe.state.name ).to.equal( 'Joppe' );

    //     keyframe.set( 'month', 'May' );
    //     expect( keyframe.state.month ).to.be.undefined;
    // } );

    // it( 'should get a value in the state', () =>
    // {
    //     const markers = keyframe.get( 'markers' );
    //     expect( markers ).to.eql( [] );

    //     const noProp = keyframe.get( 'date' );
    //     expect( noProp ).to.be.undefined;
    // } );

    // it( 'should set the name, markers and props of the current keyframe in the state, if passed in the options', () =>
    // {
    //     const options =
    //     {
    //         name    : 'John',
    //         markers : ['10%']
    //     };

    //     keyframe.setKeyframe( options );
    //     expect( keyframe.state.name ).to.equal( 'John' );
    //     expect( keyframe.state.markers ).to.eql( ['10%'] );
    //     expect( keyframe.state.props ).to.eql( {} );
    // } );

    // it( 'should return the current state of the keyframe', () =>
    // {
    //     const state = keyframe.getKeyframe();
    //     expect( state ).to.eql( { name : '', markers : [], props : {} } );
    // } );

    // it( 'should set a valid name in the state', () =>
    // {
    //     keyframe.setName( 'Kristina' );
    //     expect( keyframe.state.name ).to.equal( 'Kristina' );
    //     expect( keyframe.state.errors ).to.have.length( 0 );

    //     keyframe.setName( 9 );
    //     expect( keyframe.state.name ).to.equal( 'Kristina' );
    //     expect( keyframe.state.errors ).to.have.length( 1 );
    // } );

    // it( 'should set valid markers in the state', () =>
    // {
    //     keyframe.setMarkers( ['10%'] );
    //     expect( keyframe.state.markers ).to.eql( ['10%'] );
    //     expect( keyframe.state.errors ).to.have.length( 0 );

    //     keyframe.setMarkers( '10%' );
    //     expect( keyframe.state.markers ).to.eql( ['10%'] );
    //     expect( keyframe.state.errors ).to.have.length( 1 );

    //     keyframe.setMarkers( ['15%', 9] );
    //     expect( keyframe.state.markers ).to.eql( ['15%'] );
    //     expect( keyframe.state.errors ).to.have.length( 1 );
    // } );

    // // validation needs to be added to a prop
    // it( 'should set a valid prop in the state', () =>
    // {
    //     keyframe.setProp( 'width', '10px' );
    //     expect( keyframe.state.props ).to.eql( { width : '10px' } );
    //     keyframe.setProp( 'height', '12px' );
    //     expect( keyframe.state.props ).to.eql( { width : '10px', height : '12px'  } );
    // } );

    // it( 'should set valid props in the state', () =>
    // {
    //     keyframe.setProps( { display : 'block', border : '1px solid red' } );
    //     expect( keyframe.state.props ).to.eql( { display : 'block', border : '1px solid red' } );

    //     keyframe.setProps( [] );
    //     expect( keyframe.state.props ).to.eql( { display : 'block', border : '1px solid red' } );
    //     expect( keyframe.state.errors ).to.have.length( 1 );
    // } );

    // it( 'should set any errors in the state and returns a boolean', () =>
    // {
    //     keyframe.state.errors = [ { prop : 'name', val : 1, msg : 'Name must be a string'} ];

    //     expect( keyframe.valid( 'Zsolt', 'name' ) ).to.be.true;
    //     expect( keyframe.state.errors ).to.have.length( 0 );

    //     expect( keyframe.valid( [], 'name' ) ).to.be.false;
    //     expect( keyframe.state.errors ).to.have.length( 1 );
    // } );

} );