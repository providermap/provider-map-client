import { takeLatest, put, call } from "redux-saga/effects";

// Actions
import { LOAD } from "utils/hooks/useGeoFirestoreQuery/store/actions";

// Action Creators
import { loadSuccess, setIsLoading, setLoadError } from "utils/hooks/useGeoFirestoreQuery/store/actions";


function* load({ payload: { query } }) {
  try {
    // Short-circuit if query has not been built
    if (!query) return;

    // Set isLoading flag to true
    yield put(setIsLoading(true));

    // Make query call
    const items = yield call(query.GetQueryDocuments);

    // Save loaded items in redux store
    yield put(loadSuccess(items));
  }
  catch (error) {
    // Handle query error
    yield put(setLoadError(error));
  }
  finally {
    // Set isLoading flag to true
    yield put(setIsLoading(false));
  }
}

function* watch() {
  yield takeLatest(LOAD, load);
}

export default watch;