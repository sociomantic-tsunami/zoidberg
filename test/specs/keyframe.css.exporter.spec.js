import exportKeyframeCss from 'exporter/keyframe.css.exporter';
import Zoidberg from 'zoidberg';


describe( 'Export Keyframes CSS', () =>
{

    let keyframes;

    before( () =>
    {
        const zoidberg  = Zoidberg();
        const keyframe1 = zoidberg.createKeyframe( { name : 'bounce', markers : ['40%'], props : { width : '10px' } } );
        const keyframe2 = zoidberg.createKeyframe( { name : 'bounce', markers : ['10%'], props : { width : '50px' } } );
        const keyframe3 = zoidberg.createKeyframe( { name : 'zoom', markers : ['20%', '50%'], props : { color : 'red', height : '5%' } } );

        keyframes = [keyframe1, keyframe2, keyframe3];
    } );


    it( 'if no searchState is passed, should export all Keyframes', () =>
    {
        expect( exportKeyframeCss( undefined, undefined, keyframes ) ).to.eql( ['\n@keyframes bounce {\n    10% {\n        width:                      50px;\n    }\n    40% {\n        width:                      10px;\n    }\n}', '\n@keyframes zoom {\n    20%, 50% {\n        color:                      red;\n        height:                     5%;\n    }\n}' ] );
    } );

    it( 'if a searchState is passed that matches Keyframe states, should export those Keyframes', () =>
    {
        const testState1 = { name : 'bounce' };
        const testState2 = { name : 'bounce', markers : ['10%'] };

        expect( exportKeyframeCss( testState1, undefined, keyframes ) ).to.eql( ['\n@keyframes bounce {\n    10% {\n        width:                      50px;\n    }\n    40% {\n        width:                      10px;\n    }\n}'] );
        expect( exportKeyframeCss( testState2, undefined, keyframes ) ).to.eql( ['\n@keyframes bounce {\n    10% {\n        width:                      50px;\n    }\n}'] );
    } );

    it( 'if a searchState is passed doesnt match any Keyframe states, should return an empty array', () =>
    {
        const testState3 = { name : 'jiggle' };

        expect( exportKeyframeCss( {}, undefined, keyframes ) ).to.eql( [] );
        expect( exportKeyframeCss( testState3, undefined, keyframes ) ).to.eql( [] );
    } );

    it( 'if formatOptions are passed, should space the css accordingly', () =>
    {
        expect( exportKeyframeCss( undefined, { outerIndent : 6, innerIndent : 6, rpad : 15 }, keyframes ) ).to.eql( ['\n@keyframes bounce {\n      10% {\n      width:         50px;\n      }\n      40% {\n      width:         10px;\n      }\n}', '\n@keyframes zoom {\n      20%, 50% {\n      color:         red;\n      height:        5%;\n      }\n}'] );
    } );

    it( 'if no collection is passed, should export the states of given Keyframes', () =>
    {
        const testState4 = [ { name : 'crossFade', markers : ['5%'], props : { height : '10px' } }, { name : 'crossFade', markers : ['100%'], props : { height : '20px' } } ];
        const testState5 = [keyframes[0].getState(), keyframes[1].getState()];

        expect( exportKeyframeCss( testState4 ) ).to.eql( [ '\n@keyframes crossFade {\n    5% {\n        height:                     10px;\n    }\n    100% {\n        height:                     20px;\n    }\n}' ] );
        expect( exportKeyframeCss( testState5 ) ).to.eql( ['\n@keyframes bounce {\n    10% {\n        width:                      50px;\n    }\n    40% {\n        width:                      10px;\n    }\n}' ] );
    } );

} );