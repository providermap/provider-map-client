import { all, fork } from "redux-saga/effects";

// Container sagas
import checklistSagas from "containers/Facilities/Checklist/store/sagas";

// Hooks sagas
import paginateQuerySagas from "utils/hooks/usePaginateFirestoreQuery/store/sagas";
import geoQuerySagas from "utils/hooks/useGeoFirestoreQuery/store/sagas";


function* appSagas() {
  yield all([
    // Container sagas
    fork(checklistSagas),

    // Hook sagas
    fork(geoQuerySagas),
    fork(paginateQuerySagas)
  ]);
}

export default appSagas;