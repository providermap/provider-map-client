import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// Container reducers
import locationProviderReducer from "containers/LocationProvider/store/locationProviderReducer";
import checklistReducer from "containers/Facilities/Checklist/store/reducer";

// Hooks reducers
import geoQueryReducer from "utils/hooks/useGeoFirestoreQuery/store/reducer";
import paginateQueryReducer from "utils/hooks/usePaginateFirestoreQuery/store/reducer";


// Combine all reducers to create the state of the application
const appReducer = (history) => combineReducers({

  // Container reducers
  checklist: checklistReducer,
  location: locationProviderReducer,

  // Hooks reducers
  geoQuery: geoQueryReducer,
  paginateQuery: paginateQueryReducer,

  // Utility reducers
  router: connectRouter(history),
});

const rootReducer = (history) => (state, action) => appReducer(history)(state, action);

export default rootReducer;