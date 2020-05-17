import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createAction } from "redux-actions";

// Custom Exceptions
import InvalidParameterException from "utils/exceptions/InvalidParameterException";


// Private action to reset a redux store section
const RESET_REDUCER = "__RESET_REDUCER__";
const resetReducerActionCreator = (reducerName) => createAction(RESET_REDUCER)({ reducerName });

/**
 * Higher-order function that takes a redux reducer and a reducer name as parameter and returns a reducer
 * This function will reset the reducer to initial state when a useResetReducerOnUnmount hook with the same 'reducerName' triggers its 'cleanup function'(unmounted)
 * @example
 * const reducer = (state, action) => {...};
 * const REDUCER_NAME = "myReducer";
 * resetReducer(reducer, REDUCER_NAME);
 * @example
 * resetReducer((state = initialState, action)=> {...}, "reducerName");
 * @example
 * resetReducer(combineReducers(...), "reducerName");
 * @param {Function} reducer A redux reducer
 * @param {string} reducerName redux reducer section name
 * @returns {Function} returns a redux reducer
 */
export const resetReducer = (reducer, reducerName) => {

  // Validate reducerName
  if (typeof reducerName !== "string") {
    throw new InvalidParameterException("reducerName of type string must be provided");
  }

  // Return a reducer that can handle resetting to initial state
  return (state, action) => {

    // Check to see if action type 'RESET_REDUCER' and reducerName matches the provided reducer name name
    if (action.type === RESET_REDUCER && action.payload?.reducerName === reducerName) {
      // Pass undefined for state, which will reset the section of the redux store to it's initial state
      return reducer(undefined, action);
    }

    // Return original reducer
    return reducer(state, action);
  }
}

/**
 * Hook to reset store based on section names
 * Any reducers that must get reset to initial state should be wrapped with 'resetReducer' higher-order function
 * @param {...string} reducerNames reducer names
 * @returns {undefined} void
*/
const useResetReducerOnUnmount = (...reducerNames) => {

  // Get dispatch from Redux
  const dispatch = useDispatch();

  // When component unmounts, dispatch reset actions(s)
  useEffect(() => () => {
    // Dispatch array of reset actions
    reducerNames.forEach((reducerName) => dispatch(resetReducerActionCreator(reducerName)));
  }, []);
}

export default useResetReducerOnUnmount;