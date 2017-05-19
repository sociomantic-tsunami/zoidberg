import { validationInfo } from 'constant/info.constant';


describe( 'Info constants', () =>
{

    describe( 'validationInfo', () =>
    {
        it( 'should have validator and prop keys', () =>
        {
            expect( validationInfo ).to.have.keys( 'validator', 'prop' );
        } );

        it( 'should have a message for each key', () =>
        {
        	const entries = Object.entries( validationInfo );
        	const messages = entries.filter( pair => typeof pair[1] === 'string' );

        	expect( messages ).to.have.length( 2 );
        } );
    } );

} );


