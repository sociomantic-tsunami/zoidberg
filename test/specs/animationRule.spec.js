import AnimationRule from 'class/animationRule';


describe( 'Animation rule class', function()
{
	let animationRule, addSettersSpy, setAnimationRuleSpy;

    before( () =>
    {
        addSettersSpy       = sinon.spy( AnimationRule.prototype, 'addSetters' );
        setAnimationRuleSpy = sinon.spy( AnimationRule.prototype, 'setAnimationRule' );
    } )

    beforeEach( function()
    {
        animationRule = new AnimationRule();
    } );

    it( 'should be initialized with a default state', () =>
    {
        expect( animationRule.state ).to.be.an( 'object' );
        expect( animationRule.state ).to.have.keys( 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-name', 'animation-play-state', 'animation-timing-function', 'animation-iteration-count' );
        expect( animationRule.state['animation-delay'] ).to.be.an( 'array' );
        expect( animationRule.state['animation-direction'] ).to.be.an( 'array' );
        expect( animationRule.state['animation-duration'] ).to.be.an( 'array' );
        expect( animationRule.state['animation-fill-mode'] ).to.be.an( 'array' );
        expect( animationRule.state['animation-name'] ).to.be.an( 'array' );
        expect( animationRule.state['animation-play-state'] ).to.be.an( 'array' );
        expect( animationRule.state['animation-timing-function'] ).to.be.an( 'array' );
        expect( animationRule.state['animation-iteration-count'] ).to.be.an( 'array' );
    } );

	it( 'should call addSetters during instantiation', () =>
	{
		expect( addSettersSpy ).to.have.been.calledOnce;
	} );

	it( 'should call setAnimationRule during instantiation', () =>
	{
		expect( setAnimationRuleSpy ).to.have.been.calledOnce;
	} );

} );


