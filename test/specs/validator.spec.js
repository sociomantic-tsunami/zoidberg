import { validate, validateDeep, validateCreate } from 'util/validator';
import Keyframe from 'factory/keyframe';
import ErrorHandler from 'factory/errorHandler';


describe( 'Validator', () =>
{

    describe( 'validate', () =>
    {

        it( 'should return a boolean describing the outcome of validation', () =>
        {
            expect( validate( 'name', 'I am a name' ) ).to.be.true;
            expect( validate( 'name', 9 ) ).to.be.false;
        } );

    } );

    describe( 'validateDeep', () =>
    {
        let handler, handlerStub;

        before( () =>
        {
            handler = ErrorHandler();
            handlerStub = sinon.stub( handler, 'handle' );
        } );

        it( 'Should return a boolean decribing the outcome of validation using both validators and sub-validators of the prop', () =>
        {
            expect( validateDeep( 'animation-name', 9, handler ) ).to.be.false;
            expect( validateDeep( 'animation-name', [9], handler ) ).to.be.false;
            expect( validateDeep( 'animation-name', ['jolene'], handler ) ).to.be.true;
            expect( handlerStub ).to.have.been.calledThrice;
        } );

    } );

    describe( 'validateCreate', () =>
    {

        let testState1, testState2;

        before( () =>
        {
            testState1 = { name : 'jump', markers : ['10%', '50%'], props : { display : 'inline' } };
            testState2 = { name : 'jiggle', markers : [10], props : { display : 'block' } };
        } );

        it( 'should return undefined if no errors exist when setting a factory state', () =>
        {
            expect( validateCreate( Keyframe, [testState1] ) ).to.be.undefined;
        } );

        it( 'should return an errors object if errors exist when setting a factory state', () =>
        {
            expect( validateCreate( Keyframe, [testState1, testState2] ) ).to.eql( { errors : [ { msg : 'Marker must be from, to or a string value with percent', prop : 'marker', val : [10] } ] } );
        } );

    } );

} );