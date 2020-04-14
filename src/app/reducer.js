import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// Reducers
import locationProviderReducer from "containers/LocationProvider/store/locationProviderReducer";
import paginationQueryReducer from "utils/hooks/usePaginatedFirestoreQuery/store/reducer";


// Combine all reducers to create the state of the application
const appReducer = (history) => combineReducers({

  location: locationProviderReducer,

  paginationQuery: paginationQueryReducer,

  // Utility reducers
  router: connectRouter(history),
});

export default appReducer;