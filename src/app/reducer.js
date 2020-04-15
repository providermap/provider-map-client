import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// Reducers
import locationProviderReducer from "containers/LocationProvider/store/locationProviderReducer";
import geoQueryReducer from "utils/hooks/useGeoFirestoreQuery/store/reducer";
import paginateQueryReducer from "utils/hooks/usePaginateFirestoreQuery/store/reducer";


// Combine all reducers to create the state of the application
const appReducer = (history) => combineReducers({

  location: locationProviderReducer,

  geoQuery: geoQueryReducer,
  paginateQuery: paginateQueryReducer,

  // Utility reducers
  router: connectRouter(history),
});

export default appReducer;