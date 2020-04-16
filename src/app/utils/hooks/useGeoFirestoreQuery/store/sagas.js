import { takeEvery, put, call } from "redux-saga/effects";

// Actions
import { LOAD } from "utils/hooks/useGeoFirestoreQuery/store/actions";

// Action Creators
import {
  loadSuccess,
  setIsLoading,
  setLoadError
} from "utils/hooks/useGeoFirestoreQuery/store/actions";

// Helper functions
const generateItemsFromResultsSortedByDistance = (results) => results.docs.sort((a, b) => a.distance - b.distance).map(doc => doc.data());
const getCollectionAsync = async (query) => await query.get();


function* load({ payload: { query, pageSize } }) {
  try {
    // Set isLoading flag to true
    yield put(setIsLoading(true));

    // Make query call
    const results = yield call(getCollectionAsync, query.limit(pageSize));

    // Iterate through results and get data to normalize output
    const items = yield call(generateItemsFromResultsSortedByDistance, results);

    // Save loaded items in redux store
    yield put(loadSuccess(items));
  }
  catch (error) {
    // Handle query error
    yield put(setLoadError(error));
  }
}

function* watch() {
  yield takeEvery(LOAD, load);
}

export default watch;