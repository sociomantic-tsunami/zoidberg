import Rule from 'factory/rule';


describe( 'Rule factory', function()
{

	let rule;

    beforeEach( function()
    {
        rule = Rule();
    } );

    it( 'should have get and methods for the Rule state', () =>
    {
        expect( rule ).to.be.an( 'object' );
        expect( rule ).to.have.keys( 'getDelay', 'getErrors', 'getDirection',
        'getFillMode', 'getPlayState', 'getName', 'getTiming', 'getIterationCount',
        'getDuration', 'setDelay', 'setDirection', 'setFillMode','setPlayState',
        'setName', 'setTiming', 'setIterationCount', 'setDuration', 'getState', 'setState',
        'getEachRule' );
    } );

    it( 'should set the state of a Rule', () =>
    {
        const options =
        {
            'animation-delay' : ['1ms'],
            'animation-direction' : ['reverse'],
            'animation-name' : ['myAnimation'],
            'animation-play-state'      : ['running'],
            'animation-timing-function' : ['ease'],
        };
        const testRule  = Rule();
        const setState  = testRule.setState( options );
        const ruleState = testRule.getState();

        expect( ruleState['animation-delay'] ).to.eql( ['1ms'] );
        expect( ruleState['animation-direction'] ).to.eql( ['reverse'] );
        expect( ruleState['animation-name'] ).to.eql( ['myAnimation'] );
        expect( ruleState['animation-play-state' ] ).to.eql( ['running'] );
        expect( ruleState['animation-timing-function'] ).to.eql( ['ease'] );
        expect( ruleState['animation-duration'] ).to.eql( [] );
        expect( ruleState['animation-iteration-count'] ).to.eql( [] );
        expect( ruleState['animation-fill-mode'] ).to.eql( [] );
        expect( setState ).to.be.undefined;
    } );

    it( 'should return the state of a Rule', () =>
    {
        const ruleState = rule.getState();

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
        const options  = { 'animation-delay' : ['1ms', '2s'] };
        const testRule = Rule();

        testRule.setState( options );
        expect( testRule.getDelay() ).to.eql( ['1ms', '2s'] );
    } );

    it( 'should get an animation direction from the state', () =>
    {
        const options  = { 'animation-direction' : ['normal', 'reverse'] };
        const testRule = Rule();

        testRule.setState( options );
        expect( testRule.getDirection() ).to.eql( ['normal', 'reverse'] );
    } );

    it( 'should get an animation name from the state', () =>
    {
        const options  = { 'animation-name' : ['myAnimation'] };
        const testRule = Rule();

        testRule.setState( options );
        expect( testRule.getName() ).to.eql( ['myAnimation'] );
    } );

    it( 'should get an animation play state from the state', () =>
    {
        const options  = { 'animation-play-state' : ['running'] };
        const testRule = Rule();

        testRule.setState( options );
        expect( testRule.getPlayState() ).to.eql( ['running'] );
    } );

    it( 'should get an animation timing function from the state', () =>
    {
        const options  = { 'animation-timing-function' : ['ease-in'] };
        const testRule = Rule();

        testRule.setState( options );
        expect( testRule.getTiming() ).to.eql( ['ease-in'] );
    } );

    it( 'should get an animation duration from the state', () =>
    {
        const options  = { 'animation-duration' : ['1s'] };
        const testRule = Rule();

        testRule.setState( options );
        expect( testRule.getDuration() ).to.eql( ['1s'] );
    } );

    it( 'should get an animation iteration count from the state', () =>
    {
        const options  = { 'animation-iteration-count' : ['1'] };
        const testRule = Rule();

        testRule.setState( options );
        expect( testRule.getIterationCount() ).to.eql( ['1'] );
    } );

    it( 'should get an animation fill mode from the state', () =>
    {
        const options  = { 'animation-fill-mode' : ['forwards'] };
        const testRule = Rule();

        testRule.setState( options );
        expect( testRule.getFillMode() ).to.eql( ['forwards'] );
    } );

    it( 'should set a valid animation delay in the state', () =>
    {
        let setRule = rule.setDelay( '9' );
        expect( rule.getDelay() ).to.eql( [] );
        expect( setRule ).to.eql( { errors : [
        {
            prop: 'delay',
            msg: 'Animation delays must be a string of numbers followed by s or ms',
            val: '9'
        },
        {
            prop: 'animation-delay',
            msg: 'Animation delay must be an array',
            val: '9'
        } ] } );

        setRule = rule.setDelay( ['9s'] );
        expect( rule.getDelay() ).to.eql( ['9s'] );
        expect( setRule ).to.be.undefined;
    } );

    it( 'should set a valid animation direction in the state', () =>
    {
        let setRule = rule.setDirection( 'reverse' );
        expect( rule.getDirection() ).to.eql( [] );
        expect( setRule ).to.eql( { errors : [
        {
            prop: 'direction',
            msg: 'Animation direction must be one of normal, reverse, alternate, alternate-reverse, inherit, initial or unset',
            val: 'reverse'
        },
        {
            prop: 'animation-direction',
            msg: 'Animation direction must be an array',
            val: 'reverse'
        } ] } );

        setRule = rule.setDirection( ['reverse'] );
        expect( rule.getDirection() ).to.eql( ['reverse'] );
        expect( setRule ).to.be.undefined;
    } );

    it( 'should set a valid animation name in the state', () =>
    {
        let setRule = rule.setName( {} );
        expect( rule.getName() ).to.eql( [] );
        expect( setRule ).to.eql( { errors : [
        {
            prop: 'requiredLength',
            msg: 'Required values',
            val: {}
        },
        {
            prop: 'requiredStrings',
            msg: 'Required string values',
            val: {}
        },
        {
            prop: 'animation-name',
            msg: 'Animation name must be an array',
            val: {}
        } ] } );

        setRule = rule.setName( ['myName'] );
        expect( rule.getName() ).to.eql( ['myName'] );
        expect( setRule ).to.be.undefined;
    } );

    it( 'should set a valid animation play state in the state', () =>
    {
        let setRule = rule.setPlayState( ['stopped'] );
        expect( rule.getPlayState() ).to.eql( [] );
        expect( setRule ).to.eql( { errors : [
        {
            prop: 'playState',
            msg: 'Animation play state must be one of running, paused, inherit, initial or unset',
            val: [ 'stopped' ]
        } ] } );

        setRule = rule.setPlayState( ['paused'] );
        expect( rule.getPlayState() ).to.eql( ['paused'] );
        expect( setRule ).to.be.undefined;
    } );

    it( 'should set a valid animation timing function in the state', () =>
    {
        let setRule = rule.setTiming( ['eased'] );
        expect( rule.getTiming() ).to.eql( [] );
        expect( setRule ).to.eql( { errors : [
        {
            prop: 'timing',
            msg: 'Animation timing function must be a cubic bezier or step function or one of ease, ease-in, ease-out, ease-in-out, linear, step-start, step-end, initial, inherit or unset',
            val: [ 'eased' ]
        } ] } );

        setRule = rule.setTiming( ['ease'] );
        expect( rule.getTiming() ).to.eql( ['ease'] );
        expect( setRule ).to.be.undefined;
    } );

    it( 'should set a valid animation duration in the state', () =>
    {
        let setRule = rule.setDuration( [1] );
        expect( rule.getDuration() ).to.eql( [] );
        expect( setRule ).to.eql( { errors : [
        {
            prop: 'duration',
            msg: 'Animation duration must be a string of numbers followed by s or ms',
            val: [ 1 ]
        } ] } );

        setRule = rule.setDuration( ['1s'] );
        expect( rule.getDuration() ).to.eql( ['1s'] );
        expect( setRule ).to.be.undefined;
    } );

    it( 'should set a valid animation iteration count in the state', () =>
    {
        let setRule = rule.setIterationCount( 3 );
        expect( rule.getIterationCount() ).to.eql( [] );
        expect( setRule ).to.eql( { errors : [
        {
            prop: 'iterationCount',
            msg: 'Animation iteration count must be infinite or a string of finite numbers',
            val: 3
        },
        {
            prop: 'animation-iteration-count',
            msg: 'Animation iteration count must be an array',
            val: 3
        } ] } );

        setRule = rule.setIterationCount( ['3', '4'] );
        expect( rule.getIterationCount() ).to.eql( ['3','4'] );
        expect( setRule ).to.be.undefined;
    } );

    it( 'should set a valid animation fill mode in the state', () =>
    {
        let setRule = rule.setFillMode( ['forward'] );
        expect( rule.getFillMode() ).to.eql( [] );
        expect( setRule ).to.eql( { errors : [
        {
            prop: 'fillMode',
            msg: 'Animation fill mode must be one of both, none, forwards or backwards',
            val: [ 'forward' ]
        } ] } );

        setRule = rule.setFillMode( ['forwards'] );
        expect( rule.getFillMode() ).to.eql( ['forwards'] );
        expect( setRule ).to.be.undefined;
    } );

    it( 'should get each animation rule from the state', () =>
    {
        const options =
        {
            'animation-delay' : ['1ms'],
            'animation-direction' : ['reverse', 'alternate'],
            'animation-name' : ['myAnimation1', 'myAnimation2', 'myAnimation3'],
            'animation-play-state'      : ['running', 'paused', 'paused'],
            'animation-timing-function' : ['ease', 'ease-in', 'ease-out', 'linear'],
        };

        const testRule    = Rule();
        const setState    = testRule.setState( options );
        const getEachRule = testRule.getEachRule();

        expect( getEachRule ).to.have.length( 3 );
        expect( getEachRule[0] ).to.eql(
        {
            'animation-delay'           : ['1ms'],
            'animation-direction'       : ['reverse'],
            'animation-name'            : ['myAnimation1'],
            'animation-play-state'      : ['running'],
            'animation-timing-function' : ['ease']
        } );

        expect( getEachRule[1] ).to.eql(
        {
            'animation-delay'           : ['1ms'],
            'animation-direction'       : ['alternate'],
            'animation-name'            : ['myAnimation2'],
            'animation-play-state'      : ['paused'],
            'animation-timing-function' : ['ease-in']
        } );

        expect( getEachRule[2] ).to.eql(
        {
            'animation-delay'           : ['1ms'],
            'animation-direction'       : ['reverse'],
            'animation-name'            : ['myAnimation3'],
            'animation-play-state'      : ['paused'],
            'animation-timing-function' : ['ease-out']
        } );

    } );

} );