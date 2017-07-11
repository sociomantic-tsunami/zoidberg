import exportRulesCss from 'exporter/rule.css.exporter';
import Zoidberg from 'zoidberg';


describe( 'Export Rules CSS', () =>
{

    let rules, testState1, testState2, testState3, testState4, testState5,
    testState6, testState7, testState8, testState9;

    before( () =>
    {
        const zoidberg = Zoidberg();
        const rule1 = zoidberg.createRule( { 'animation-name' : ['bretzel'], 'animation-timing-function' : ['ease'] } );
        const rule2 = zoidberg.createRule( { 'animation-name' : ['bretzel', 'bier'], 'animation-timing-function' : ['ease-in', 'ease-out'] } );
        const rule3 = zoidberg.createRule( { 'animation-name' : ['bier'], 'animation-timing-function' : ['step-end'] } );
        const rule4 = zoidberg.createRule( { 'animation-name' : ['schinken', 'eier'], 'animation-delay' : ['1ms'], 'animation-direction' : ['normal'], 'animation-duration' : ['1s', '15ms'], 'animation-fill-mode' : ['forwards'], 'animation-iteration-count' : ['1'], 'animation-play-state' : ['running'], 'animation-timing-function' : ['ease'] } );
        const rule5 = zoidberg.createRule( { 'animation-name' : ['obst'], 'animation-delay' : ['0s'], 'animation-fill-mode' : ['none'] } );

        rules = [rule1, rule2, rule3, rule4, rule5];

        testState1 = { 'animation-name' : ['bier'] };
        testState2 = { 'animation-name' : ['bretzel'], 'animation-timing-function' : ['ease'] };
        testState3 = { 'animation-name' : ['wurst'] };
        testState4 = [ { 'animation-name' : ['wurst, pfefferlinge'], 'animation-fill-mode' : ['none, both'], 'animation-direction' : ['normal'] }, { 'animation-name' : ['eintopf'], 'animation-play-state' : ['running'], 'animation-direction' : [] } ];
        testState5 = { 'animation-name' : ['obst'] };

        testState6 = [rules[0].getState(), rules[2].getState()];
        testState7 = rules[1].getEachRule();
        testState8 = rules[3].getEachRule();
        testState9 = [rules[0].getState()];

    } );

    it( 'if no state is passed, should export all rules', () =>
    {
        expect( exportRulesCss( undefined, undefined, rules ) ).to.eql( [ '\n        animation-name:             bretzel;\n        animation-timing-function:  ease;\n', '\n        animation-name:             bretzel, bier;\n        animation-timing-function:  ease-in, ease-out;\n', '\n        animation-name:             bier;\n        animation-timing-function:  step-end;\n', '\n        animation-delay:            1ms;\n        animation-direction:        normal;\n        animation-duration:         1s, 15ms;\n        animation-fill-mode:        forwards;\n        animation-name:             schinken, eier;\n        animation-play-state:       running;\n        animation-timing-function:  ease;\n        animation-iteration-count:  1;\n', '\n        animation-delay:            0s;\n        animation-fill-mode:        none;\n        animation-name:             obst;\n' ] );
    } );

    it( 'if a state is passed that matches specific rules, should export those rules', () =>
    {
        expect( exportRulesCss( undefined, testState1, rules ) ).to.eql( [ '\n        animation-name:             bretzel, bier;\n        animation-timing-function:  ease-in, ease-out;\n', '\n        animation-name:             bier;\n        animation-timing-function:  step-end;\n' ] );
        expect( exportRulesCss( undefined, testState2, rules ) ).to.eql( [ '\n        animation-name:             bretzel;\n        animation-timing-function:  ease;\n' ] );
    } );

    it( 'if a state is passed that matches no rules, should return an empty array', () =>
    {
        expect( exportRulesCss( undefined, {}, rules ) ).to.eql( [] );
        expect( exportRulesCss( undefined, testState3, rules ) ).to.eql( [] );
    } );

    it( 'if spacing related formatting options are passed, should space the css accordingly', () =>
    {
        expect( exportRulesCss( { innerIndent : 0, rpad : 15 }, undefined, rules ) ).to.eql( [ '\nanimation-name:bretzel;\nanimation-timing-function:ease;\n','\nanimation-name:bretzel, bier;\nanimation-timing-function:ease-in, ease-out;\n', '\nanimation-name:bier;\nanimation-timing-function:step-end;\n', '\nanimation-delay:1ms;\nanimation-direction:normal;\nanimation-duration:1s, 15ms;\nanimation-fill-mode:forwards;\nanimation-name:schinken, eier;\nanimation-play-state:running;\nanimation-timing-function:ease;\nanimation-iteration-count:1;\n', '\nanimation-delay:0s;\nanimation-fill-mode:none;\nanimation-name:obst;\n' ] );
    } );

    it( 'if no collection is passed, should export the states of the passed rules',() =>
    {
        expect( exportRulesCss( {}, testState4 ) ).to.eql( [ '\n        animation-name:             wurst, pfefferlinge;\n        animation-fill-mode:        none, both;\n        animation-direction:        normal;\n', '\n        animation-name:             eintopf;\n        animation-play-state:       running;\n' ] );
        expect( exportRulesCss( {}, testState6 ) ).to.eql( [ '\n        animation-name:             bretzel;\n        animation-timing-function:  ease;\n', '\n        animation-name:             bier;\n        animation-timing-function:  step-end;\n' ] );
        expect( exportRulesCss( {}, testState7 ) ).to.eql( [ '\n        animation-name:             bretzel;\n        animation-timing-function:  ease-in;\n', '\n        animation-name:             bier;\n        animation-timing-function:  ease-out;\n' ] );
    } );

    it( 'if the shorthand option is passed, should export the first value of every property in a rule in shorthand order', () =>
    {
        const options = { shorthand : true };

        expect( exportRulesCss( options, testState8 ) ).to.eql( [ '1s ease 1ms 1 normal forwards running schinken', '15ms ease 1ms 1 normal forwards running eier' ] );
        expect( exportRulesCss( options, testState9 ) ).to.eql( [ 'ease bretzel' ] );
        expect( exportRulesCss( options, testState5, rules ) ).to.eql( ['0s none obst'] );
    } );

} );