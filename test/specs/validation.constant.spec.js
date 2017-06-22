import { validation, getValidator, info } from 'constant/validation.constant';


describe( 'Validation constants', () =>
{

    let entries;

    beforeEach( () =>
    {
        entries = Object.entries( validation );
    } );

    it( 'should have validation objects', () =>
    {
        expect( Object.keys( validation ) ).to.have.length( 27 );
    } );

    it( 'should each have a validator function', () =>
    {
        const validators = entries.filter( pair => typeof pair[1].validator === 'function' );

        expect( validators ).to.have.length( 27 );
    } );

    it( 'should each have a validator message', () =>
    {
        const messages = entries.filter( pair => pair[1].msg );

        expect( messages ).to.have.length( 24 );
    } );

    describe( 'info', () =>
    {

        it( 'should have validator and prop keys', () =>
        {
            expect( info ).to.have.keys( 'validator', 'validation', 'iterator' );
        } );

        it( 'should have a message for each key', () =>
        {
            const entries = Object.entries( info );
            const messages = entries.filter( pair => typeof pair[1] === 'string' );

            expect( messages ).to.have.length( 3 );
        } );

    } );

    describe( 'getValidator', () =>
    {

        before( () =>
        {
            validation._test1 = { validator : true };
            validation._test2 = { validator : () => {}, iterator : true };
            validation._test3 = { validator : () => {} };
            validation._test4 = { validator : () => {}, subValidator : ['_test3'] };
        } );

        after( () =>
        {
            delete validation._test1;
            delete validation._test2;
            delete validation._test3;
            delete validation._test4;
        } );

        it( 'should throw an error if there is no validator for the prop', () =>
        {
            expect( () => { getValidator( '_noTest' ) } ).to.throw( Error, 'Validation for prop does not exist' );
        } );

        it( 'should throw an error if the validator is not a function', () =>
        {
            expect( () => { getValidator( '_test1' ) } ).to.throw( Error, 'Validator does not exist' );
        } );

        it( 'should throw an error if the iterator is not a function', () =>
        {
            expect( () => { getValidator( '_test2' ) } ).to.throw( Error, 'Iterator does not exist' );
        } );

        it( 'should return the validator associated with a prop', () =>
        {
            expect( getValidator( '_test3' ) ).to.equal( validation._test3.validator );
        } );

        it( 'should return the validator and subValidators associated with a prop', () =>
        {
            const validators = getValidator( '_test4', true );

            expect( validators ).to.be.an.array;
            expect( validators ).to.have.length( 2 );
            expect( validators[0] ).to.eql( { prop : '_test3', validator : validation._test3.validator } );
            expect( validators[1] ).to.eql( { prop : '_test4', validator : validation._test4.validator } );
        } );

    } );

} );