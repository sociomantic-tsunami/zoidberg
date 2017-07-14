import
{
    addSetters,
    addGetters,
    getStateHelper,
    setStateHelper,
    valueAtIndex
} from 'helper/factory.helper';


describe( 'Factory helpers', () =>
{

    let mock, rule, validSpy, setSpy, getSpy, errorsSpy, getters, setters;

    before( () =>
    {
        rule    = { 'Date' : 'date', 'Age' : 'age', 'Time' : 'time' };
        getters = ['Date', 'Age', 'Time'];
        setters = ['Date', 'Time'];
        mock    =
        {
            set : function ( prop, val ) { return 'set' },
            get : function ( prop ) { return 'get' },
            valid : function ( prop, val ) { return val },
            getErrors : function() { return }
        };

        validSpy  = sinon.spy( mock, 'valid' );
        setSpy    = sinon.spy( mock, 'set' );
        getSpy    = sinon.spy( mock, 'get' );
        errorsSpy = sinon.spy( mock, 'getErrors' );
    } );

    afterEach( () =>
    {
        validSpy.reset();
        setSpy.reset();
        getSpy.reset();
        errorsSpy.reset();
    } );

    describe( 'addSetters', () =>
    {

        let setFuncs;

        beforeEach( () =>
        {
            setFuncs = addSetters( rule, setters, setSpy, validSpy, errorsSpy );
        } );

        it( 'should return an object of setter functions prefixed by set and suffixed by a setter name', () =>
        {
            expect( setFuncs ).to.be.an( 'object' );
            expect( setFuncs ).to.have.keys( 'setDate', 'setTime' );
            expect( setFuncs['setDate'] ).to.be.a( 'function' );
            expect( setFuncs['setTime'] ).to.be.a( 'function' );
        } );

        it( 'setter functions should call the passed valid method and set method if the valid method returns true', () =>
        {
            setFuncs['setDate']( false );

            expect( validSpy.callCount ).to.equal( 1 );
            expect( validSpy.calledWith( 'date', false ) ).to.be.true;
            expect( setSpy.callCount ).to.equal( 0 );
            expect( errorsSpy.callCount ).to.equal( 1 );

            setFuncs['setDate']( true );

            expect( validSpy.callCount ).to.equal( 2 );
            expect( validSpy.calledWith( 'date', true ) ).to.be.true;
            expect( setSpy.callCount ).to.equal( 1 );
            expect( setSpy.calledWith( 'date', true ) ).to.be.true;
            expect( errorsSpy.callCount ).to.equal( 2 );
        } );

    } );

    describe( 'addGetters', () =>
    {

        let getFuncs;

        beforeEach( () =>
        {
            getFuncs = addGetters( rule, getters, getSpy );
        } );

        it( 'should return an object of getter functions prefixed by get and suffixed by a getter name', () =>
        {
            expect( getFuncs ).to.be.an( 'object' );
            expect( getFuncs ).to.have.keys( 'getDate', 'getAge', 'getTime' );
            expect( getFuncs['getDate'] ).to.be.a( 'function' );
            expect( getFuncs['getAge'] ).to.be.a( 'function' );
            expect( getFuncs['getTime'] ).to.be.a( 'function' );
        } );

        it( 'getter functions should call the passed get method', () =>
        {
            getFuncs['getDate']();
            expect( getSpy.callCount ).to.equal( 1 );
        } );

    } );

    describe( 'getState', () =>
    {

        let getFuncs;

        before( () =>
        {
            getFuncs = addGetters( rule, getters, getSpy );
        } );

        it( 'should call the get methods used to get the factorys state prop', () =>
        {
            const getDateSpy = sinon.spy( getFuncs, 'getDate' );
            const getTimeSpy = sinon.spy( getFuncs, 'getTime' );

            getStateHelper( rule, getFuncs );

            expect( getDateSpy.callCount ).to.equal( 1 );
            expect( getTimeSpy.callCount ).to.equal( 1 );
        } );

        it( 'should return an object of the factorys state props and their values', () =>
        {
            const state = getStateHelper( rule, getFuncs );
            expect( state ).to.eql( { date : 'get', time : 'get', age: 'get' } );
        } );

    } );

    describe( 'setState', () =>
    {

        let setFuncs;

        before( () =>
        {
            setFuncs = addSetters( rule, setters, setSpy, validSpy, errorsSpy );
        } );

        it( 'should call the set methods used to set the factorys state prop if it exists in the options', () =>
        {
            const setDateSpy = sinon.spy( setFuncs, 'setDate' );
            const setTimeSpy = sinon.spy( setFuncs, 'setTime' );

            setStateHelper( rule, setFuncs, errorsSpy, { date : 'today' } );

            expect( setDateSpy.callCount ).to.equal( 1 );
            expect( setDateSpy.calledWith( 'today' ) ).to.be.true;
            expect( setTimeSpy.callCount ).to.equal( 0 );
            expect( errorsSpy.callCount ).to.equal( 2 );
        } );

        it( 'should return an error if the options passed are not valid', () =>
        {
            expect( setStateHelper( rule, setFuncs, errorsSpy, false ) ).to.eql( { errors : [ { prop: 'state', msg: 'State must be a plain object', val: false } ] } );
        } );

    } );

    describe( 'valueAtIndex', () =>
    {

        it( 'should return undefined it the array is empty', () =>
        {
            expect( valueAtIndex( 3, [] ) ).to.be.undefined;
        } );

        it( 'should recursively find the value at an index if the index is greater than the array length', () =>
        {
            expect( valueAtIndex( 7, ['first', 'second', 'third'] ) ).to.equal( 'second' );
        } );

        it( 'should return the value at the given index if the index is less than the array length', ()=>
        {
            expect( valueAtIndex( 2, ['first', 'second'] ) ).to.equal( 'first' );
        } );

    } );

} );