import Zoidberg from 'zoidberg';


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

        it( 'should remove keyframes that match the passed state and returns the number of keyframes removed', () =>
        {
            expect( zoidberg.removeKeyframes( { 'name' : 'popo' } ) ).to.equal( 0 );
            expect( zoidberg.removeKeyframes( { 'name' : 'hoho' } ) ).to.equal( 1 );
            expect( zoidberg.removeKeyframes( { 'name' : 'nono', 'markers' : ['20%'] } ) ).to.equal( 1 );
            expect( zoidberg.removeKeyframes( { 'name' : 'nono' } ) ).to.equal( 2 );

            expect( zoidberg.findKeyframes( { 'name' : 'nono' } ) ).to.have.length( 0 );
            expect( zoidberg.findKeyframes( { 'name' : 'hoho' } ) ).to.have.length( 0 );
        } );

    } );

} );