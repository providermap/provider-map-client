import { all, fork } from "redux-saga/effects";

// Sagas
import paginateQuerySagas from "utils/hooks/usePaginateFirestoreQuery/store/sagas";
import geoQuerySagas from "utils/hooks/useGeoFirestoreQuery/store/sagas";


function* appSagas() {
  yield all([
    fork(geoQuerySagas),
    fork(paginateQuerySagas)
  ]);
}

export default appSagas;