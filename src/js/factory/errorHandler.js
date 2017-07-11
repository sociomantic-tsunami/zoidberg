import { validation } from 'constant/validation.constant';


/**
* Error Handler Factory
*
* Handler for managing Zoidberg errors.
*
* @param    {Object}            state                 error state
* @property {Array}             state.errors          errors
*/
const ErrorHandlerFactory = function ( errorState )
{

    /**
    * State of the error handler.
    *
    * @typedef  {Object}        state                  error state
    * @property {Array}         state.errors           current errors
    */
    let state =
    {
        errors : []
    };


    /**
    * Gets the state.
    *
    * @return {Object}                                 error state
    */
    const get = () => state;


    /**
    * Sets the errors in the state.
    *
    * @param    {Object}        errorState             error state
    * @property {Array}         state.errors           errors
    */
    const set = errorState =>
    {
        const { errors } = errorState;

        state.errors = [ ...state.errors, ...errors];
    };


    /**
    * Determines whether there are error objects in the handler state.
    *
    * @return {Boolean}                                 true, if has errors
    */
    const hasErrors = () =>
    {
        const { errors } = state;

        return !! errors.length;
    };


    /**
    * Removes error objects from the state.
    *
    * @param {String}           prop                    prop
    * @param {*}                val                     value
    */
    const remove = prop =>
    {
        const { errors } = state;
        const newErrors  = errors.filter( err => err.prop !== prop );

        state = { errors : newErrors };
    };


    /**
    * Adds error objects to the state.
    *
    * @param {String}           prop                    prop
    * @param {*}                val                     value
    */
    const add = ( prop, val ) =>
    {
        const { errors }  = state;
        const errorObject = { prop, val, msg : validation[prop].msg };

        errors.push( errorObject );
    };


    /**
    * Handles new and existing errors. Removes existing errors that match the
    * given prop. If the valid param is false, add a new error to the state.
    *
    * @param {String}           prop                    prop
    * @param {*}                val                     value
    * @param {Boolean}          valid                   true, if value is valid
    */
    const handle = ( prop, val, valid ) =>
    {
        remove( prop );

        if( ! valid ) add( prop, val );
    };


    if( errorState ) set( errorState );

    return {
        set,
        get,
        add,
        remove,
        handle,
        hasErrors
    }

};

export default ( errorState ) => ErrorHandlerFactory( errorState );