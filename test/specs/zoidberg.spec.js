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

        it( 'should create and return a rule passed valid options', () =>
        {
            const rule = zoidberg.createRule( { 'animation-name' : ['lolo'] } );
            expect( rule.getName ).to.be.a( 'function' );
            expect( rule.getName() ).to.eql( ['lolo'] );
            expect( rule.errors ).to.be.undefined;
        } );

        it( 'should not create a rule and return an error object if passed invalid options', () =>
        {
            const rule = zoidberg.createRule( { 'animation-name' : [] } );
            expect( rule.getName ).to.be.undefined;
            expect( rule.errors ).to.be.an( 'array' );
            expect( rule.errors ).to.have.length( 1 );
        } );

    } );

    describe( 'createKeyframe', () =>
    {

        it( 'should create and return a keyframe passed valid options', () =>
        {
            const keyframe = zoidberg.createKeyframe( { 'name' : 'dodo' } );
            expect( keyframe.getName ).to.be.a( 'function' );
            expect( keyframe.getName() ).to.eql( 'dodo' );
            expect( keyframe.errors ).to.be.undefined;
        } );

        it( 'should not create a keyframe and return an error object if passed invalid options', () =>
        {
            const keyframe = zoidberg.createKeyframe( { 'name' : '' } );
            expect( keyframe.getName ).to.be.undefined;
            expect( keyframe.errors ).to.be.an( 'array' );
            expect( keyframe.errors ).to.have.length( 1 );
        } );

    } );

    describe( 'findKeyframes', () =>
    {

        it( 'should call the find helper with the passed state and keyframes collection', () =>
        {
            const keyframe = zoidberg.createKeyframe( { 'name' : 'nono' } );
            expect( zoidberg.findKeyframes( { 'name' : 'nono' } )[0] ).to.eql( keyframe );
            expect( zoidberg.findKeyframes( { 'name' : 'popo' } ) ).to.eql( [] );
        } );

    } );


    describe( 'findRules', () =>
    {

        it( 'should call the find helper with the passed state and rules collection', () =>
        {
            const rule = zoidberg.createRule( { 'animation-name' : ['vovo'] } );
            expect( zoidberg.findRules( { 'animation-name' : ['vovo'] } )[0] ).to.eql( rule );
            expect( zoidberg.findKeyframes( { 'name' : 'bobo' } ) ).to.eql( [] );
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

        it( 'should remove keyframes that match the passed state and returns the state of the keyframes removed', () =>
        {
            expect( zoidberg.removeKeyframes( { 'name' : 'popo' } ) ).to.eql( [] );
            expect( zoidberg.removeKeyframes( { 'name' : 'hoho' } ) ).to.eql( [{ markers: [ '15%' ], name: 'hoho', props: {} }] );
            expect( zoidberg.removeKeyframes( { 'name' : 'nono', 'markers' : ['20%'] } ) ).to.eql( [{ markers: [ '20%', '10%' ], name: 'nono', props: {} }] );
            expect( zoidberg.removeKeyframes( { 'name' : 'nono' } ) ).to.eql( [{ markers: [ '10%' ], name: 'nono', props: {} }, { markers: [ '15%' ], name: 'nono', props: {} }] );

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

        it( 'should remove rule that match the passed state and returns the state of the rules removed', () =>
        {
            expect( zoidberg.removeRules( { 'animation-name' : ['popo'] } ) ).to.eql( [] );
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

    } );


    describe( 'exporters', () =>
    {

        let state, options, astExporterSpy;

        before( () =>
        {
            astExporterSpy = sinon.spy( exportAst, 'default' );
        } );

        beforeEach( () =>
        {
            zoidberg.createKeyframe( { 'name' : 'jojo', 'markers' : ['10%'], props : { color: 'red' } } );
            zoidberg.createKeyframe( { 'name' : 'joppe', 'markers' : ['15%'], props : { color: 'blue' } } );
            zoidberg.createKeyframe( { 'name' : 'joppe', 'markers' : ['20%', '10%'], props : { color: 'green' } } );

            zoidberg.createRule( { 'animation-name' : ['bretzel'], 'animation-delay' : ['100ms'] } );
            zoidberg.createRule( { 'animation-name' : ['bretzel'], 'animation-delay' : ['1s', '2s'] } );
            zoidberg.createRule( { 'animation-name' : ['bier'], 'animation-delay' : ['30ms'] } );

            stateKeyframe = { 'name' : 'joppe' };
            stateRule     = { 'animation-name' : ['bretzel'] };
            options =
            {
                outerIndent : 3,
                innerIndent : 5,
                colon : 5,
                rpad : 10
            };

        } );

        afterEach( () =>
        {
            astExporterSpy.reset();
        } );

        it( 'should return the css of keyframes that match the passed state, in the format of the passed options', () =>
        {
            expect( zoidberg.keyframesToCss( options, stateKeyframe ) ).to.eql( ['\n@keyframes joppe {\n   15% {\n     color:    blue;\n   }\n   20%, 10% {\n     color:    green;\n   }\n}'] );
            expect( zoidberg.keyframesToCss( options ) ).to.eql( ['\n@keyframes jojo {\n   10% {\n     color:    red;\n   }\n}', '\n@keyframes joppe {\n   15% {\n     color:    blue;\n   }\n   20%, 10% {\n     color:    green;\n   }\n}'] );
        } );

        it( 'should call the AST parser with the correct arguments', () =>
        {
            const ast = zoidberg.keyframesToAst( {} );

            expect( astExporterSpy ).to.be.calledOnce;
            expect( astExporterSpy.calledWith( [] ) ).to.be.true;
        } );

        it( 'should return the css of rules that match the passed state, in the format of the passed options', () =>
        {
            expect( zoidberg.rulesToCss( options, stateRule ) ).to.eql( ['\n     animation-delay:100ms;\n     animation-name:bretzel;\n', '\n     animation-delay:1s, 2s;\n     animation-name:bretzel;\n' ] );
            expect( zoidberg.rulesToCss( options, { 'animation-delay' : ['30ms'] } ) ).to.eql( ['\n     animation-delay:30ms;\n     animation-name:bier;\n' ] );
        } );

        it( 'should return the ast of rules that match the passed state, in the format of the passed options', () =>
        {
            const ast = zoidberg.rulesToAst( { 'animation-name' : ['bier'] } );

            expect( ast ).to.be.an( 'array' );
            expect( ast[0].stylesheet.parsingErrors ).to.have.length( 0 );

            expect( ast[0].stylesheet.rules ).to.have.length( 1 );
            expect( ast[0].stylesheet.rules[0].type ).to.equal( 'rule' );
            expect( ast[0].stylesheet.rules[0].declarations[0].property ).to.equal( 'animation-delay' );
            expect( ast[0].stylesheet.rules[0].declarations[0].value ).to.equal( '30ms' );
            expect( ast[0].stylesheet.rules[0].declarations[1].property ).to.equal( 'animation-name' );
            expect( ast[0].stylesheet.rules[0].declarations[1].value ).to.equal( 'bier' );
        } );

    } );

} );