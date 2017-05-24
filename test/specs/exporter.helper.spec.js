import { sortMarkers, buildProperty } from 'helper/exporter.helper';

describe( 'Exporter Helper', () =>
{

    describe( 'sortMarkers', () =>
    {

        it( 'should sort the markers in ascending order, according to the first marker', () =>
        {
            const states = [
                { markers : ['50%', '60%'] },
                { markers : ['10%'] },
                { markers : ['5%', '55%', '100%'] }
            ];

            expect( sortMarkers( states ) ).to.eql( [ { markers: [ '5%', '55%', '100%' ] }, { markers: [ '10%' ] }, { markers: [ '50%', '60%' ] } ] );
        } );

        it( 'should remove markers that are empty from the final sorting', () =>
        {
            const states = [
                { markers : ['50%', '60%'] },
                { markers : [] },
                { markers : ['5%', '55%', '100%'] }
            ];

            expect( sortMarkers( states ) ).to.eql( [ { markers: [ '5%', '55%', '100%' ] }, { markers: [ '50%', '60%' ] } ] );
        } );

    } );

    describe( 'buildProperty', () =>
    {

        it( 'should build a property according to the formatting', () =>
        {
            expect( buildProperty( 'backgroundColor', '24px', { innerIndent : 2, colon : 4, rpad : 24 } ) ).to.equal( '\n  backgroundColor:        24px;' );
            expect( buildProperty( 'backgroundColor', '24px', { innerIndent : 0, colon : 0, rpad : 0 } ) ).to.equal( '\nbackgroundColor:24px;' );
            expect( buildProperty( 'backgroundColor', '24px', { innerIndent : 2, colon : 1, rpad : 15 } ) ).to.equal( '\n  backgroundColor:24px;' );
        } );

    } );

} );