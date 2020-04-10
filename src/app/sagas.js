import { all, fork } from "redux-saga/effects";

// Sagas
import querySagas from "store/query/sagas";


function* appSagas() {
  yield all([
    fork(querySagas)
  ]);
}

export default appSagas;