import exportKeyframeCss from 'exporter/keyframesCss.exporter';
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


    it( 'if no state is passed, should export all keyframes', () =>
    {
        let options, state;
        expect( exportKeyframeCss( options, state, keyframes ) ).to.eql( ['\n@keyframes bounce {\n    10% {\n        width:                      50px;\n    }\n    40% {\n        width:                      10px;\n    }\n}', '\n@keyframes zoom {\n    20%, 50% {\n        color:                      red;\n        height:                     5%;\n    }\n}' ] );
    } );

    it( 'if a state is passed that matches specific keyframes, should export those keyframes', () =>
    {
        let options, state = { name : 'bounce' };
        expect( exportKeyframeCss( options, state, keyframes ) ).to.eql( ['\n@keyframes bounce {\n    10% {\n        width:                      50px;\n    }\n    40% {\n        width:                      10px;\n    }\n}'] );

        state = { name : 'bounce', markers : ['10%'] };
        expect( exportKeyframeCss( options, state, keyframes ) ).to.eql( ['\n@keyframes bounce {\n    10% {\n        width:                      50px;\n    }\n}'] );
    } );

    it( 'if a state is passed that matches no keyframes, should return an empty array', () =>
    {
        let options, state = {};
        expect( exportKeyframeCss( options, state, keyframes ) ).to.eql( [] );

        state = { name : 'jiggle' };
        expect( exportKeyframeCss( options, state, keyframes ) ).to.eql( [] );
    } );

    it( 'if spacing related formatting options are passed, should space the css accordingly', () =>
    {
        let state, options = { outerIndent : 6, innerIndent : 6, rpad : 15 };

        expect( exportKeyframeCss( options, state, keyframes ) ).to.eql( ['\n@keyframes bounce {\n      10% {\n      width:         50px;\n      }\n      40% {\n      width:         10px;\n      }\n}', '\n@keyframes zoom {\n      20%, 50% {\n      color:         red;\n      height:        5%;\n      }\n}'] );
    } );

} );