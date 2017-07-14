import Zoidberg from 'zoidberg';
import * as exportAst from 'exporter/ast.exporter';


describe( 'Zoidberg', () =>
{

    let zoidberg;

    beforeEach( () =>
    {
        zoidberg = Zoidberg();
    } );

    describe( 'createRule', () =>
    {

        it( 'should create and return a Rule if passed a valid Rule state', () =>
        {
            const rule = zoidberg.createRule( { 'animation-name' : ['lolo'] } );
            expect( rule.getName ).to.be.a( 'function' );
            expect( rule.getName() ).to.eql( ['lolo'] );
            expect( rule.errors ).to.be.undefined;
        } );

        it( 'should not create a Rule and return an Error if passed an invalid Keyframe state', () =>
        {
            const rule = zoidberg.createRule( { 'animation-name' : [] } );
            expect( rule.getName ).to.be.undefined;
            expect( rule.errors ).to.be.an( 'array' );
            expect( rule.errors ).to.have.length( 1 );
        } );

    } );

    describe( 'createKeyframe', () =>
    {

        it( 'should create and return a Keyframe if passed a valid Keyframe state', () =>
        {
            const keyframe = zoidberg.createKeyframe( { 'name' : 'dodo' } );
            expect( keyframe.getName ).to.be.a( 'function' );
            expect( keyframe.getName() ).to.eql( 'dodo' );
            expect( keyframe.errors ).to.be.undefined;
        } );

        it( 'should not create a Keyframe and return an Error if passed an invalid Keyframe state', () =>
        {
            const keyframe = zoidberg.createKeyframe( { 'name' : '' } );
            expect( keyframe.getName ).to.be.undefined;
            expect( keyframe.errors ).to.be.an( 'array' );
            expect( keyframe.errors ).to.have.length( 1 );
        } );

    } );

    describe( 'findKeyframes', () =>
    {

        let keyframe;

        beforeEach( ()=>
        {
            keyframe = zoidberg.createKeyframe( { 'name' : 'nono' } );
        } );

        it( 'should find the Keyframe states that match the searchState', () =>
        {
            expect( zoidberg.findKeyframes( { 'name' : 'nono' } )[0] ).to.eql( keyframe );
        } );

        it( 'should return an empty array if no Keyframe states match the searchState', () =>
        {
            expect( zoidberg.findKeyframes( { 'name' : 'popo' } ) ).to.eql( [] );
        } );

        it( 'should return an empty array if an invalid searchState is given', () =>
        {
            expect( zoidberg.findKeyframes( 'popo' ) ).to.eql( [] );
        } );

        it( 'should return an empty array if an empty searchState is given', () =>
        {
            expect( zoidberg.findKeyframes( {} ) ).to.eql( [] );
        } );

    } );


    describe( 'findRules', () =>
    {

        let rule;

        beforeEach( () =>
        {
            rule = zoidberg.createRule( { 'animation-name' : ['vovo'] } );
        } );

        it( 'should find the Rule states that match the searchState', () =>
        {
            expect( zoidberg.findRules( { 'animation-name' : ['vovo'] } )[0] ).to.eql( rule );
        } );

        it( 'should return an empty array if no Keyframe states are passed that match the searchState', ()=>
        {
            expect( zoidberg.findRules( { 'animation-name' : ['bobo'] } ) ).to.eql( [] );
        } );

        it( 'should return an empty array if no Rule states match the searchState', () =>
        {
            expect( zoidberg.findRules( { 'animation-name' : ['bobo'] } ) ).to.eql( [] );
        } );

        it( 'should return an empty array if an invalid searchState is given', () =>
        {
            expect( zoidberg.findRules( { 'animation-name' : 'bobo' } ) ).to.eql( [] );
        } );

        it( 'should return an empty array if an empty searchState is given', () =>
        {
            expect( zoidberg.findRules( {} ) ).to.eql( [] );
        } );

    } );


    describe( 'removeKeyframes', () =>
    {

        beforeEach( () =>
        {
            zoidberg.createKeyframe( { 'name' : 'nono', 'markers' : ['10%'] } );
            zoidberg.createKeyframe( { 'name' : 'nono', 'markers' : ['15%'] } );
            zoidberg.createKeyframe( { 'name' : 'nono', 'markers' : ['20%', '10%'] } );
            zoidberg.createKeyframe( { 'name' : 'hoho', 'markers' : ['15%'] } );
        } );

        it( 'should remove Keyframes that have a state that matches the searchState and returns the state of the Keyframes removed', () =>
        {
            expect( zoidberg.removeKeyframes( { 'name' : 'popo' } ) ).to.eql( [] );
            expect( zoidberg.removeKeyframes( {} ) ).to.eql( [] );
            expect( zoidberg.removeKeyframes( { 'name' : 'hoho' } ) ).to.eql( [{ markers: [ '15%' ], name: 'hoho', props: {} }] );
            expect( zoidberg.removeKeyframes( { 'name' : 'nono', 'markers' : ['20%'] } ) ).to.eql( [{ markers: [ '20%', '10%' ], name: 'nono', props: {} }] );
            expect( zoidberg.removeKeyframes( { 'name' : 'nono' } ) ).to.eql( [{ markers: [ '10%' ], name: 'nono', props: {} }, { markers: [ '15%' ], name: 'nono', props: {} }] );

            expect( zoidberg.findKeyframes( { 'name' : 'nono' } ) ).to.eql( [] );
            expect( zoidberg.findKeyframes( { 'name' : 'hoho' } ) ).to.eql( [] );
        } );

        it( 'should remove all Keyframes if state is falsy', () =>
        {
            expect( zoidberg.removeKeyframes() ).to.eql( [{ 'name' : 'nono', 'markers' : ['10%'], props: {} }, { 'name' : 'nono', 'markers' : ['15%'], props: {} }, { 'name' : 'nono', 'markers' : ['20%', '10%'], props: {} }, { 'name' : 'hoho', 'markers' : ['15%'], props: {} }] );
            expect( zoidberg.findKeyframes( { 'name' : 'nono' } ) ).to.eql( [] );
            expect( zoidberg.findKeyframes( { 'name' : 'hoho' } ) ).to.eql( [] );
        } );

    } );


    describe( 'removeRules', () =>
    {

        beforeEach( () =>
        {
            zoidberg.createRule( { 'animation-name' : ['nono'], 'animation-duration' : ['1ms'] } );
            zoidberg.createRule( { 'animation-name' : ['nono'], 'animation-duration' : ['10s'] } );
            zoidberg.createRule( { 'animation-name' : ['nono'], 'animation-duration' : ['20ms', '10s'] } );
            zoidberg.createRule( { 'animation-name' : ['hoho'], 'animation-duration' : ['1s'] } );
        } );

        it( 'should remove Rules that have a state that matches the searchState and returns the state of the Rules removed', () =>
        {
            expect( zoidberg.removeRules( { 'animation-name' : ['popo'] } ) ).to.eql( [] );
            expect( zoidberg.removeRules( {} ) ).to.eql( [] );
            expect( zoidberg.removeRules( { 'animation-name' : ['hoho'] } ) ).to.eql( [
            {
                'animation-delay': [],
                'animation-direction': [],
                'animation-duration': ['1s'],
                'animation-fill-mode': [],
                'animation-name': ['hoho'],
                'animation-play-state': [],
                'animation-timing-function': [],
                'animation-iteration-count': []
            } ] );

            expect( zoidberg.removeRules( { 'animation-name' : ['nono'], 'animation-duration' : ['10s'] } ) ).to.eql( [
            {
                'animation-delay': [],
                'animation-direction': [],
                'animation-duration': ['10s'],
                'animation-fill-mode': [],
                'animation-name': ['nono'],
                'animation-play-state': [],
                'animation-timing-function': [],
                'animation-iteration-count': []
            },
              {
                'animation-delay': [],
                'animation-direction': [],
                'animation-duration': ['20ms', '10s'],
                'animation-fill-mode': [],
                'animation-name': ['nono'],
                'animation-play-state': [],
                'animation-timing-function': [],
                'animation-iteration-count': []
            } ] );
            expect( zoidberg.removeRules( { 'animation-name' : ['nono'] } ) ).to.eql( [
            {
                'animation-delay': [],
                'animation-direction': [],
                'animation-duration': ['1ms'],
                'animation-fill-mode': [],
                'animation-name': ['nono'],
                'animation-play-state': [],
                'animation-timing-function': [],
                'animation-iteration-count': []
            } ] );

            expect( zoidberg.findRules( { 'name' : ['nono'] } ) ).to.eql( [] );
            expect( zoidberg.findRules( { 'name' : ['hoho'] } ) ).to.eql( [] );
        } );

        it( 'should remove all Rules if state is falsy', () =>
        {
            expect( zoidberg.removeRules() ).to.eql( [
            {
                'animation-delay': [],
                'animation-direction': [],
                'animation-duration': [ '1ms' ],
                'animation-fill-mode': [],
                'animation-name': [ 'nono' ],
                'animation-play-state': [],
                'animation-timing-function': [],
                'animation-iteration-count': []
            },
            {
                'animation-delay': [],
                'animation-direction': [],
                'animation-duration': [ '10s' ],
                'animation-fill-mode': [],
                'animation-name': [ 'nono' ],
                'animation-play-state': [],
                'animation-timing-function': [],
                'animation-iteration-count': []
            },
            {
                'animation-delay': [],
                'animation-direction': [],
                'animation-duration': [ '20ms', '10s' ],
                'animation-fill-mode': [],
                'animation-name': [ 'nono' ],
                'animation-play-state': [],
                'animation-timing-function': [],
                'animation-iteration-count': []
            },
            {
                'animation-delay': [],
                'animation-direction': [],
                'animation-duration': [ '1s' ],
                'animation-fill-mode': [],
                'animation-name': [ 'hoho' ],
                'animation-play-state': [],
                'animation-timing-function': [],
                'animation-iteration-count': []
            } ] );
            expect( zoidberg.findRules( { 'name' : ['nono'] } ) ).to.eql( [] );
            expect( zoidberg.findRules( { 'name' : ['hoho'] } ) ).to.eql( [] );
        } );

    } );


    describe( 'exporters', () =>
    {

        let formatOptions, astExporterSpy, testState1, testState2, testState3,
        testState4, testState5, testState6, testState7;

        before( () =>
        {
            astExporterSpy = sinon.spy( exportAst, 'default' );
        } );

        beforeEach( () =>
        {
            zoidberg.createKeyframe( { 'name' : 'jojo', 'markers' : ['10%'], props : { color: 'red' } } );
            zoidberg.createKeyframe( { 'name' : 'john', 'markers' : ['1%'] } );
            zoidberg.createKeyframe( { 'name' : 'joppe', 'markers' : ['15%'], props : { color: 'blue' } } );
            zoidberg.createKeyframe( { 'name' : 'joppe', 'markers' : ['20%', '10%'], props : { color: 'green' } } );

            zoidberg.createRule( { 'animation-name' : ['bretzel'], 'animation-delay' : ['100ms'] } );
            zoidberg.createRule( { 'animation-name' : ['bretzel'], 'animation-delay' : ['1s', '2s'] } );
            zoidberg.createRule( { 'animation-name' : ['bier'], 'animation-delay' : ['30ms'] } );

            formatOptions = { outerIndent : 3, innerIndent : 5, rpad : 10 };

            testState1 = { 'name' : 'joppe' };
            testState2 = { 'animation-name' : ['bretzel'] };
            testState3 = { 'animation-delay' : ['30ms'] };
            testState4 = { markers : ['1%'] };
            testState5 = { markers : [35] };
            testState6 = { 'animation-name' : ['bier'] };
            testState7 = { 'animation-name' : [77] };
        } );

        afterEach( () =>
        {
            astExporterSpy.reset();
        } );

        it( 'should return the css of Keyframes that match the searchState, in the format of the passed formatOptions', () =>
        {
            expect( zoidberg.findKeyframesToCss( testState1, formatOptions ) ).to.eql( ['\n@keyframes joppe {\n   15% {\n     color:    blue;\n   }\n   20%, 10% {\n     color:    green;\n   }\n}'] );
            expect( zoidberg.findKeyframesToCss( undefined, formatOptions ) ).to.eql( ['\n@keyframes jojo {\n   10% {\n     color:    red;\n   }\n}', '\n@keyframes john {\n   1% {\n   }\n}', '\n@keyframes joppe {\n   15% {\n     color:    blue;\n   }\n   20%, 10% {\n     color:    green;\n   }\n}'] );
            expect( zoidberg.findKeyframesToCss( [], formatOptions ) ).to.eql( [] );
        } );

        it( 'should return the css of Rules that match the searchState, in the format of the passed formatOptions', () =>
        {
            expect( zoidberg.findRulesToCss( testState2, formatOptions ) ).to.eql( ['\n     animation-delay:100ms;\n     animation-name:bretzel;\n', '\n     animation-delay:1s, 2s;\n     animation-name:bretzel;\n' ] );
            expect( zoidberg.findRulesToCss( testState3, formatOptions ) ).to.eql( ['\n     animation-delay:30ms;\n     animation-name:bier;\n' ] );
            expect( zoidberg.findRulesToCss( {}, formatOptions ) ).to.eql( [] );
        } );

        it( 'should call the AST parser with the correct arguments when exporting Keyframe states', () =>
        {
            zoidberg.findKeyframesToAst( testState4 );
            expect( astExporterSpy ).to.be.calledOnce;
            expect( astExporterSpy.calledWith( [ '\n@keyframes john {\n    1% {\n    }\n}' ] ) ).to.be.true;

            zoidberg.findKeyframesToAst( testState5 );
            expect( astExporterSpy ).to.be.calledTwice;
            expect( astExporterSpy.calledWith( [] ) ).to.be.true;
        } );

        it( 'should call the AST parser with the correct arguments when exporting Rule states', () =>
        {
            zoidberg.findRulesToAst( testState6 );
            expect( astExporterSpy ).to.be.calledOnce;
            expect( astExporterSpy.calledWith( [ '.selector { \n        animation-delay:            30ms;\n        animation-name:             bier;\n }' ] ) ).to.be.true;

            zoidberg.findRulesToAst( testState7 );
            expect( astExporterSpy ).to.be.calledTwice;
            expect( astExporterSpy.calledWith( [] ) ).to.be.true;
        } );

        it( 'should return the css of the passed Keyframe states, in the format of the passed formatOptions, or an Error if errors exist', () =>
        {
            expect( zoidberg.keyframesToCss( [testState4], formatOptions ) ).to.eql( [ '\n@keyframes undefined {\n   1% {\n   }\n}' ] );
            expect( zoidberg.keyframesToCss( [testState4, formatOptions, testState5] ) ).to.eql( { errors : [ { msg : 'Marker must be from, to or a string value with percent', prop : 'marker', val : [35] } ] } );
        } );

        it( 'should return the css of the passed Rule states, in the format of the passed formatOptions, or an Error if errors exist', () =>
        {
            expect( zoidberg.rulesToCss( [testState6], formatOptions ) ).to.eql( [ '\n     animation-name:bier;\n' ] );
            expect( zoidberg.rulesToCss( [testState6, formatOptions, testState7] ) ).to.eql( { errors : [ { msg : 'Required string values', prop : 'requiredStrings', val : [77] } ] } );
        } );

        it( 'should call the AST parser with the correct arguments when exporting Keyframe states or an Error if errors exist', () =>
        {
            zoidberg.keyframesToAst( [testState4] );
            expect( astExporterSpy ).to.be.calledOnce;
            expect( astExporterSpy.calledWith( [ '\n@keyframes undefined {\n    1% {\n    }\n}' ] ) ).to.be.true;

            zoidberg.keyframesToAst( [testState4, testState5] );
            expect( zoidberg.keyframesToAst( [testState4, testState5] ) ).to.eql( { errors : [ { msg : 'Marker must be from, to or a string value with percent', prop : 'marker', val : [35] } ] } );
        } );

        it( 'should call the AST parser with the correct arguments when exporting Rule states or an Error if errors exist', () =>
        {
            zoidberg.rulesToAst( [testState6] );
            expect( astExporterSpy ).to.be.calledOnce;
            expect( astExporterSpy.calledWith( [ '.selector { \n        animation-name:             bier;\n }' ] ) ).to.be.true;

            zoidberg.rulesToAst( [testState6, testState7] );
            expect( zoidberg.rulesToAst( [testState6, testState7] ) ).to.eql( { errors : [ { msg : 'Required string values', prop : 'requiredStrings', val : [77] } ] } );
        } );

    } );

} );