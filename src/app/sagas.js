import { all, fork } from "redux-saga/effects";

// Sagas
import querySagas from "utils/hooks/usePaginatedFirestoreQuery/store/sagas";


function* appSagas() {
  yield all([
    fork(querySagas)
  ]);
}

export default appSagas;