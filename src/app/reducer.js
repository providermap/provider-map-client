import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// Reducers
import locationProviderReducer from "containers/LocationProvider/store/locationProviderReducer";


// Combine all reducers to create the state of the application
const appReducer = (history) => combineReducers({

  location: locationProviderReducer,

  // Utility reducers
  router: connectRouter(history),
});

export default appReducer;