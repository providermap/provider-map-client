import { takeEvery, put, call } from "redux-saga/effects";

// Actions
import { LOAD } from "utils/hooks/useGeoFirestoreQuery/store/actions";

// Action Creators
import {
  loadSuccess,
  setIsLoading,
  setLoadError
} from "utils/hooks/useGeoFirestoreQuery/store/actions";

// Utils
import { rsf } from "utils/firebase";


// Helper functions
const generateItemsFromResults = (results) => results.docs.map(doc => doc.data());


function* initialLoadSaga({ payload: { query, pageSize } }) {
  try {
    // Set isLoading flag to true
    yield put(setIsLoading(true));

    // Make query call
    const results = yield call(
      rsf.firestore.getCollection,
      query.limit(pageSize)
    );

    // Iterate through results and get data to normalize output
    const items = yield call(generateItemsFromResults, results);

    // Save loaded items in redux store
    yield put(loadSuccess(items));
  }
  catch (error) {
    // Handle query error
    yield put(setLoadError(error));
  }
  finally {
    // Set isLoading flag to false
    yield put(setIsLoading(false));
  }
}

function* watch() {
  yield takeEvery(LOAD, initialLoadSaga);
}

export default watch;