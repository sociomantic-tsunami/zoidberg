import { cloneDeep } from 'util/helpers';


describe( 'Util helpers', () =>
{
    it( 'should clone a value deeply', () =>
    {
        const original = [
            { greet : 'hi', depart : 'bye' },
            1,
            ['in', 18, { nested : true } ],
            'First level',
            { nested : { nested : { nested : 3 } } }
        ];
        const clone = cloneDeep( original );

        clone[0].depart = 'tschuss';
        clone[1] = 25;
        clone[4].nested.nested.nested = 'I am in the nest';

		expect( original[0].depart ).to.be.equal( 'bye' );
        expect( original[1] ).to.be.equal( 1 );
        expect( original[4].nested.nested.nested ).to.be.equal( 3 );
    } );

} );


