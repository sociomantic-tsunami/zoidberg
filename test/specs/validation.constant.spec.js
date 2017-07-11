import { validation, getValidator, info } from 'constant/validation.constant';


describe( 'Validation constants', () =>
{

    it( 'should each have a validator function', () =>
    {
        const entries = Object.entries( validation );

        expect( entries.every( pair => typeof pair[1].validator === 'function' ) ).to.be.true;
    } );


    describe( 'info', () =>
    {

        it( 'should have a message for each key', () =>
        {
            const entries = Object.entries( info );

            expect( entries.every( pair => typeof pair[1] === 'string' ) ).to.be.true;
        } );

    } );

    describe( 'getValidator', () =>
    {

        it( 'should throw an error if there is no validator for the prop', () =>
        {
            expect( () => { getValidator( '_noTest' ) } ).to.throw( Error, 'Validation for prop does not exist' );
        } );

        it( 'should throw an error if the validator is not a function', () =>
        {
            validation._test1 = { validator : true };

            expect( () => { getValidator( '_test1' ) } ).to.throw( Error, 'Validator does not exist' );

            delete validation._test1;
        } );

        it( 'should throw an error if the iterator is not a function', () =>
        {
            validation._test2 = { validator : () => {}, iterator : true };

            expect( () => { getValidator( '_test2' ) } ).to.throw( Error, 'Iterator does not exist' );

            delete validation._test2;
        } );

        it( 'should return the validator associated with a prop', () =>
        {
            validation._test3 = { validator : () => {} };

            expect( getValidator( '_test3' ) ).to.equal( validation._test3.validator );

            delete validation._test3;
        } );

        it( 'should return the validator and subValidators associated with a prop', () =>
        {
            validation._test3 = { validator : () => {} };
            validation._test4 = { validator : () => {}, subValidator : ['_test3'] };

            const validators = getValidator( '_test4', true );

            expect( validators ).to.be.an.array;
            expect( validators ).to.have.length( 2 );
            expect( validators[0] ).to.eql( { prop : '_test3', validator : validation._test3.validator } );
            expect( validators[1] ).to.eql( { prop : '_test4', validator : validation._test4.validator } );

            delete validation._test3;
            delete validation._test4;
        } );

    } );

} );