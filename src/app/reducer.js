import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// Reducers
//import blahReducer from "containers/x/y/reducer";


// Combine all reducers to create the state of the application
const appReducer = (history) => combineReducers({
  // Container reducers
  // blah: blahReducer,

  // Utility reducers
  router: connectRouter(history),
});

export default appReducer;