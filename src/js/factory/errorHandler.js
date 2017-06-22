import { validation } from 'constant/validation.constant';


/**
* Error Handler
*
* Handler for managing Zoidberg errors.
*
* @param    {Object}                                   error state
* @property {Array}             state.errors           errors to set
*/
export default function ErrorHandler ( errors )
{

    /**
    * Error state of the handler.
    *
    * @typedef  {Object}                               error state
    * @property {Array}         state.errors           current errors
    */
    let errorState =
    {
        errors : []
    };


    /**
    * Gets the error state.
    *
    * @return {Object}                                 error state
    */
    const get = () => errorState;


    /**
    * Sets the errors in the state.
    *
    * @param    {Object}                               state
    * @property {Array}         state.errors           errors to set
    */
    const set = state =>
    {
        const { errors } = state;

        errorState.errors = [ ...errorState.errors, ...errors];
    };


    /**
    * Determines whether there are error objects in the handler error state.
    *
    * @return {Boolean}                                 true, if has errors
    */
    const hasErrors = () =>
    {
        const { errors } = errorState;

        return !! errors.length;
    };


    /**
    * Removes error objects from the error state.
    *
    * @param {String}           prop                    prop
    * @param {*}                val                     value
    */
    const remove = prop =>
    {
        const { errors } = errorState;
        const newErrors  = errors.filter( err => err.prop !== prop );

        errorState = { errors : newErrors };
    };


    /**
    * Adds error objects to the error state.
    *
    * @param {String}           prop                    prop
    * @param {*}                val                     value
    */
    const add = ( prop, val ) =>
    {
        const { errors }  = errorState;
        const errorObject = { prop, val, msg : validation[prop].msg };

        errors.push( errorObject );
    };


    /**
    * Handles new and existing errors. Removes existing errors that match the
    * given prop. If the valid param is false, add a new error to the error state.
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

    if( errors ) set( errors );


    return {
        set,
        get,
        add,
        remove,
        handle,
        hasErrors
    }

};