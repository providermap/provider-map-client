import { all, /*fork*/ } from "redux-saga/effects";

// Sagas
// import blahSagas from "containers/x/y/sagas";


function* appSagas() {
  yield all([
    //fork(authenticationSagas),
  ]);
}

export default appSagas;