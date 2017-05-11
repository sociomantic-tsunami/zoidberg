import AnimationRule from 'factory/rule';


describe( 'Animation rule class', function()
{
	let animationRule;

    beforeEach( function()
    {
        animationRule = AnimationRule();
    } );

    it( 'should have get and methods for the state', () =>
    {
        expect( animationRule ).to.be.an( 'object' );
        expect( animationRule ).to.have.keys( 'getDelay', 'getErrors', 'getDirection',
        'getFillMode', 'getPlayState', 'getName', 'getTiming', 'getIterationCount',
        'getDuration', 'setDelay', 'setDirection', 'setFillMode','setPlayState',
        'setName', 'setTiming', 'setIterationCount', 'setDuration', 'getRule' );
    } );

    it( 'should set the options of the current rule in the state, if passed', () =>
    {
        const options =
        {
            'animation-delay' : ['1ms'],
            'animation-direction' : ['reverse'],
            'animation-name' : ['myAnimation'],
            'animation-play-state'      : ['running'],
            'animation-timing-function' : ['ease'],
        };
        const testRule = AnimationRule( options );
        const ruleState = testRule.getRule();

        expect( ruleState['animation-delay'] ).to.eql( ['1ms'] );
        expect( ruleState['animation-direction'] ).to.eql( ['reverse'] );
        expect( ruleState['animation-name'] ).to.eql( ['myAnimation'] );
        expect( ruleState['animation-play-state' ] ).to.eql( ['running'] );
        expect( ruleState['animation-timing-function'] ).to.eql( ['ease'] );
        expect( ruleState['animation-duration'] ).to.eql( [] );
        expect( ruleState['animation-iteration-count'] ).to.eql( [] );
        expect( ruleState['animation-fill-mode'] ).to.eql( [] );
    } );

    it( 'should return the current state of the animation rule', () =>
    {
        const ruleState = animationRule.getRule();

        expect( ruleState['animation-delay'] ).to.eql( [] );
        expect( ruleState['animation-direction'] ).to.eql( [] );
        expect( ruleState['animation-name'] ).to.eql( [] );
        expect( ruleState['animation-play-state' ] ).to.eql( [] );
        expect( ruleState['animation-timing-function'] ).to.eql( [] );
        expect( ruleState['animation-duration'] ).to.eql( [] );
        expect( ruleState['animation-iteration-count'] ).to.eql( [] );
        expect( ruleState['animation-fill-mode'] ).to.eql( [] );
    } );

    it( 'should get an animation delay from the state', () =>
    {
        const options = { 'animation-delay' : ['1ms', '2s'] };
        const testRule = AnimationRule( options );

        expect( testRule.getDelay() ).to.eql( ['1ms', '2s'] );
    } );

    it( 'should get an animation direction from the state', () =>
    {
        const options = { 'animation-direction' : ['normal', 'reverse'] };
        const testRule = AnimationRule( options );

        expect( testRule.getDirection() ).to.eql( ['normal', 'reverse'] );
    } );

    it( 'should get an animation name from the state', () =>
    {
        const options = { 'animation-name' : ['myAnimation'] };
        const testRule = AnimationRule( options );

        expect( testRule.getName() ).to.eql( ['myAnimation'] );
    } );

    it( 'should get an animation play state from the state', () =>
    {
        const options = { 'animation-play-state' : ['running'] };
        const testRule = AnimationRule( options );

        expect( testRule.getPlayState() ).to.eql( ['running'] );
    } );

    it( 'should get an animation timing function from the state', () =>
    {
        const options = { 'animation-timing-function' : ['ease-in'] };
        const testRule = AnimationRule( options );

        expect( testRule.getTiming() ).to.eql( ['ease-in'] );
    } );

    it( 'should get an animation duration from the state', () =>
    {
        const options = { 'animation-duration' : ['1s'] };
        const testRule = AnimationRule( options );

        expect( testRule.getDuration() ).to.eql( ['1s'] );
    } );

    it( 'should get an animation iteration count from the state', () =>
    {
        const options = { 'animation-iteration-count' : ['1'] };
        const testRule = AnimationRule( options );

        expect( testRule.getIterationCount() ).to.eql( ['1'] );
    } );

    it( 'should get an animation fill mode from the state', () =>
    {
        const options = { 'animation-fill-mode' : ['forwards'] };
        const testRule = AnimationRule( options );

        expect( testRule.getFillMode() ).to.eql( ['forwards'] );
    } );

    it( 'should set a valid animation delay in the state', () =>
    {
        animationRule.setDelay( '9' );
        expect( animationRule.getDelay() ).to.eql( [] );

        animationRule.setDelay( ['9s'] );
        expect( animationRule.getDelay() ).to.eql( ['9s'] );
    } );

    it( 'should set a valid animation direction in the state', () =>
    {
        animationRule.setDirection( 'reverse' );
        expect( animationRule.getDirection() ).to.eql( [] );

        animationRule.setDirection( ['reverse'] );
        expect( animationRule.getDirection() ).to.eql( ['reverse'] );
    } );

    it( 'should set a valid animation name in the state', () =>
    {
        animationRule.setName( {} );
        expect( animationRule.getName() ).to.eql( [] );

        animationRule.setName( ['myName'] );
        expect( animationRule.getName() ).to.eql( ['myName'] );
    } );

    it( 'should set a valid animation play state in the state', () =>
    {
        animationRule.setPlayState( ['stopped'] );
        expect( animationRule.getPlayState() ).to.eql( [] );

        animationRule.setPlayState( ['paused'] );
        expect( animationRule.getPlayState() ).to.eql( ['paused'] );
    } );

    it( 'should set a valid animation timing function in the state', () =>
    {
        animationRule.setTiming( ['eased'] );
        expect( animationRule.getTiming() ).to.eql( [] );

        animationRule.setTiming( ['ease'] );
        expect( animationRule.getTiming() ).to.eql( ['ease'] );
    } );

    it( 'should set a valid animation duration in the state', () =>
    {
        animationRule.setDuration( [1] );
        expect( animationRule.getDuration() ).to.eql( [] );

        animationRule.setDuration( ['1s'] );
        expect( animationRule.getDuration() ).to.eql( ['1s'] );
    } );

    it( 'should set a valid animation iteration count in the state', () =>
    {
        animationRule.setIterationCount( 3 );
        expect( animationRule.getIterationCount() ).to.eql( [] );

        animationRule.setIterationCount( ['3', '4'] );
        expect( animationRule.getIterationCount() ).to.eql( ['3','4'] );
    } );

    it( 'should set a valid animation fill mode in the state', () =>
    {
        animationRule.setFillMode( ['forward'] );
        expect( animationRule.getFillMode() ).to.eql( [] );

        animationRule.setFillMode( ['forwards'] );
        expect( animationRule.getFillMode() ).to.eql( ['forwards'] );
    } );

    it( 'should get errors from the state', () =>
    {
        animationRule.setDelay( ['lol'] );
        expect( animationRule.getErrors() ).to.eql( [ { prop : 'delay', val : ['lol'], msg : 'Animation delays must be a string of numbers followed by s or ms' } ] );
    } );
} );