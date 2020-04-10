import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// Reducers
import locationProviderReducer from "containers/LocationProvider/store/locationProviderReducer";
import queryReducer from "store/query/reducer";


// Combine all reducers to create the state of the application
const appReducer = (history) => combineReducers({

  location: locationProviderReducer,

  query: queryReducer,

  // Utility reducers
  router: connectRouter(history),
});

export default appReducer;