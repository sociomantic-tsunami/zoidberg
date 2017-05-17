import { find } from 'helper/zoidberg.helper';
import Keyframe from 'factory/keyframe';
import Rule from 'factory/rule';


describe( 'find', () =>
{

    let keyframeCollection, ruleCollection;

    before( () =>
    {
        const keyframe1 = Keyframe();
        keyframe1.setState( { name : 'jojo', markers : ['10%', '20%'] } );

        const keyframe2 = Keyframe();
        keyframe2.setState( { name : 'popo', markers : ['25%', '11%'] } );

        const keyframe3 = Keyframe();
        keyframe3.setState( { name : 'popo', markers : ['35%'] } );

        const rule1 = Rule();
        rule1.setState( { 'animation-name' : ['coco'], 'animation-duration' : ['1s'] } );

        const rule2 = Rule();
        rule2.setState( { 'animation-name' : ['momo'], 'animation-duration' : ['1s'] } );

        keyframeCollection = [keyframe1, keyframe2, keyframe3];
        ruleCollection = [rule1, rule2];
    } );

    it( 'should return an empty array if the state to search for is empty', () =>
    {
        expect( find( {}, ruleCollection ) ).to.eql( [] );
    } );

    it( 'should return a rule that partially matches the passed state object', () =>
    {
        let popo = find( { name : 'popo' }, keyframeCollection );
        expect( popo ).to.have.length( 2 );
        expect( popo[0] ).to.eql( keyframeCollection[1] );
        expect( popo[1] ).to.eql( keyframeCollection[2] );

        popo = find( { name : 'popo', markers : ['25%'] }, keyframeCollection );
        expect( popo ).to.have.length( 1 );
        expect( popo[0] ).to.eql( keyframeCollection[1] );

        let momo = find( { 'animation-duration' : ['1s'] }, ruleCollection );
        expect( momo ).to.have.length( 2 );
        expect( momo[0] ).to.eql( ruleCollection[0] );
        expect( momo[1] ).to.eql( ruleCollection[1] );

        momo = find( { 'animation-name' : ['momo'], 'animation-duration' : ['1s'] }, ruleCollection );
        expect( momo ).to.have.length( 1 );
        expect( momo[0] ).to.eql( ruleCollection[1] );
    } );

} );