import exportRulesCss from 'exporter/rule.css.exporter';
import Zoidberg from 'zoidberg';


describe( 'Export Rules CSS', () =>
{

    let rules;

    before( () =>
    {
        const zoidberg = Zoidberg();
        const rule1 = zoidberg.createRule( { 'animation-name' : ['bretzel'], 'animation-timing-function' : ['ease'] } );
        const rule2 = zoidberg.createRule( { 'animation-name' : ['bretzel', 'bier'], 'animation-timing-function' : ['ease-in', 'ease-out'] } );
        const rule3 = zoidberg.createRule( { 'animation-name' : ['bier'], 'animation-timing-function' : ['step-end'] } );
        const rule4 = zoidberg.createRule( { 'animation-name' : ['schinken', 'eier'], 'animation-delay' : ['1ms'], 'animation-direction' : ['normal'], 'animation-duration' : ['1s', '15ms'], 'animation-fill-mode' : ['forwards'], 'animation-iteration-count' : ['1'], 'animation-play-state' : ['running'], 'animation-timing-function' : ['ease'] } );
        const rule5 = zoidberg.createRule( { 'animation-name' : ['obst'], 'animation-delay' : ['0s'], 'animation-fill-mode' : ['none'] } );

        rules = [rule1, rule2, rule3, rule4, rule5];
    } );

    it( 'if no searchState is passed, should export all Rules', () =>
    {
        expect( exportRulesCss( undefined, undefined, rules ) ).to.eql( [ '\n        animation-name:             bretzel;\n        animation-timing-function:  ease;\n', '\n        animation-name:             bretzel, bier;\n        animation-timing-function:  ease-in, ease-out;\n', '\n        animation-name:             bier;\n        animation-timing-function:  step-end;\n', '\n        animation-delay:            1ms;\n        animation-direction:        normal;\n        animation-duration:         1s, 15ms;\n        animation-fill-mode:        forwards;\n        animation-name:             schinken, eier;\n        animation-play-state:       running;\n        animation-timing-function:  ease;\n        animation-iteration-count:  1;\n', '\n        animation-delay:            0s;\n        animation-fill-mode:        none;\n        animation-name:             obst;\n' ] );
    } );

    it( 'if a searchState is passed that matches Rule states, should export those Rules', () =>
    {
        const testState1 = { 'animation-name' : ['bier'] };
        const testState2 = { 'animation-name' : ['bretzel'], 'animation-timing-function' : ['ease'] };

        expect( exportRulesCss( testState1, undefined, rules ) ).to.eql( [ '\n        animation-name:             bretzel, bier;\n        animation-timing-function:  ease-in, ease-out;\n', '\n        animation-name:             bier;\n        animation-timing-function:  step-end;\n' ] );
        expect( exportRulesCss( testState2, undefined, rules ) ).to.eql( [ '\n        animation-name:             bretzel;\n        animation-timing-function:  ease;\n' ] );
    } );

    it( 'if a searchState is passed that doesnt match any Rules, should return an empty array', () =>
    {
        const testState3 = { 'animation-name' : ['wurst'] };

        expect( exportRulesCss( {}, undefined, rules ) ).to.eql( [] );
        expect( exportRulesCss( testState3, undefined, rules ) ).to.eql( [] );
    } );

    it( 'if formatOptions are given, should space the css accordingly', () =>
    {
        expect( exportRulesCss( '', { innerIndent : 0, rpad : 15 }, rules ) ).to.eql( [ '\nanimation-name:bretzel;\nanimation-timing-function:ease;\n','\nanimation-name:bretzel, bier;\nanimation-timing-function:ease-in, ease-out;\n', '\nanimation-name:bier;\nanimation-timing-function:step-end;\n', '\nanimation-delay:1ms;\nanimation-direction:normal;\nanimation-duration:1s, 15ms;\nanimation-fill-mode:forwards;\nanimation-name:schinken, eier;\nanimation-play-state:running;\nanimation-timing-function:ease;\nanimation-iteration-count:1;\n', '\nanimation-delay:0s;\nanimation-fill-mode:none;\nanimation-name:obst;\n' ] );
    } );

    it( 'if no collection is passed, should export the states of the given Rules',() =>
    {
        const testState4 = [ { 'animation-name' : ['wurst, pfefferlinge'], 'animation-fill-mode' : ['none, both'], 'animation-direction' : ['normal'] }, { 'animation-name' : ['eintopf'], 'animation-play-state' : ['running'], 'animation-direction' : [] } ];
        const testState5 = [rules[0].getState(), rules[2].getState()];
        const testState6 = rules[1].getEachRule();

        expect( exportRulesCss( testState4 ) ).to.eql( [ '\n        animation-name:             wurst, pfefferlinge;\n        animation-fill-mode:        none, both;\n        animation-direction:        normal;\n', '\n        animation-name:             eintopf;\n        animation-play-state:       running;\n' ] );
        expect( exportRulesCss( testState5 ) ).to.eql( [ '\n        animation-name:             bretzel;\n        animation-timing-function:  ease;\n', '\n        animation-name:             bier;\n        animation-timing-function:  step-end;\n' ] );
        expect( exportRulesCss( testState6 ) ).to.eql( [ '\n        animation-name:             bretzel;\n        animation-timing-function:  ease-in;\n', '\n        animation-name:             bier;\n        animation-timing-function:  ease-out;\n' ] );
    } );

    it( 'if the shorthand option is set to true, should export the first value of every property in a Rule in shorthand order', () =>
    {
        const testState7 = rules[3].getEachRule();
        const testState8 = [rules[0].getState()];
        const testState9 = { 'animation-name' : ['obst'] };

        const options = { shorthand : true };

        expect( exportRulesCss( testState7, options ) ).to.eql( [ '1s ease 1ms 1 normal forwards running schinken', '15ms ease 1ms 1 normal forwards running eier' ] );
        expect( exportRulesCss( testState8, options ) ).to.eql( [ 'ease bretzel' ] );
        expect( exportRulesCss( testState9, options, rules ) ).to.eql( ['0s none obst'] );
    } );

} );