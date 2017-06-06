import exportRulesCss from 'exporter/rulesCss.exporter';
import Zoidberg from 'zoidberg';


describe( 'Export Rules CSS', () =>
{

    let rules;

    before( () =>
    {
        const zoidberg  = Zoidberg();
        const rule1 = zoidberg.createRule( { 'animation-name' : ['bretzel'], 'animation-timing-function' : ['ease'] } );
        const rule2 = zoidberg.createRule( { 'animation-name' : ['bretzel'], 'animation-timing-function' : ['ease-in', 'ease-out'] } );
        const rule3 = zoidberg.createRule( { 'animation-name' : ['bier'], 'animation-timing-function' : ['step-end'] } );

        rules = [rule1, rule2, rule3];
    } );


    it( 'if no state is passed, should export all rules', () =>
    {
        let options, state;
        expect( exportRulesCss( options, state, rules ) ).to.eql( ['\n        animation-name:             bretzel;\n        animation-timing-function:  ease;\n', '\n        animation-name:             bretzel;\n        animation-timing-function:  ease-in, ease-out;\n', '\n        animation-name:             bier;\n        animation-timing-function:  step-end;\n'] );
    } );

    it( 'if a state is passed that matches specific rules, should export those rules', () =>
    {
        let options, state = { 'animation-name' : ['bier'] };
        expect( exportRulesCss( options, state, rules ) ).to.eql( [ '\n        animation-name:             bier;\n        animation-timing-function:  step-end;\n'] );

        state = { 'animation-name' : ['bretzel'], 'animation-timing-function' : ['ease-in'] };
        expect( exportRulesCss( options, state, rules ) ).to.eql( ['\n        animation-name:             bretzel;\n        animation-timing-function:  ease-in, ease-out;\n'] );
    } );

    it( 'if a state is passed that matches no rules, should return an empty array', () =>
    {
        let options, state = {};
        expect( exportRulesCss( options, state, rules ) ).to.eql( [] );

        state = { 'animation-name' : ['wurst'] };
        expect( exportRulesCss( options, state, rules ) ).to.eql( [] );
    } );

    it( 'if spacing related formatting options are passed, should space the css accordingly', () =>
    {
        let state, options = { innerIndent : 0, rpad : 15 };

        expect( exportRulesCss( options, state, rules ) ).to.eql( ['\nanimation-name:bretzel;\nanimation-timing-function:ease;\n', '\nanimation-name:bretzel;\nanimation-timing-function:ease-in, ease-out;\n', '\nanimation-name:bier;\nanimation-timing-function:step-end;\n' ] );
    } );

} );