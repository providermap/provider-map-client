import { takeEvery, put, call, select } from "redux-saga/effects";

// Actions
import { INITIAL_LOAD, LOAD_MORE } from "store/query/actions";

// Action Creators
import { initialLoadSuccess, loadMoreSuccess, setIsLoading, setIsLoadingMore, setHasMore, setLoadError } from "store/query/actions";

// Selectors
import { getLastLoadedDocument } from "store/query/selectors";

// Utils
import { rsf } from "utils/firebase";


function* initialLoadSaga({ payload: { query, pageSize } }) {
  try {
    // Set isLoading flag to true
    yield put(setIsLoading(true));

    // Reset hasMore value
    yield put(setHasMore(true));

    // Make query call
    const results = yield call(
      rsf.firestore.getCollection,
      query.limit(pageSize)
    );

    // Find last loaded document
    const lastLoadedDocument = results.docs[results.docs.length - 1];

    // Iterate through results and get data to normalize output
    const items = results.docs.map(doc => doc.data());

    // If loaded results is less than page size, there are no more results
    if (results.docs.length < pageSize) {
      yield put(setHasMore(false));
    }

    // Save loaded items in redux store
    yield put(initialLoadSuccess(items, pageSize, lastLoadedDocument));
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

function* loadMoreSaga({ payload: { query, pageSize } }) {
  try {
    // Set isLoadingMore flag to true
    yield put(setIsLoadingMore(true));

    // Get reference to the last loaded document
    const prevLastLoadedDocument = yield select(getLastLoadedDocument);

    // Make query call
    const results = yield call(
      rsf.firestore.getCollection,
      query.startAfter(prevLastLoadedDocument).limit(pageSize)
    );

    // Find new last loaded document
    const lastLoadedDocument = results.docs[results.docs.length - 1];

    // Iterate through documents and get data to normalize output
    const items = results.docs.map(doc => doc.data());

    // If loaded results is less than page size, there are no more results
    if (results.docs.length < pageSize) {
      yield put(setHasMore(false));
    }

    // Save loaded items in redux store
    yield put(loadMoreSuccess(items, pageSize, lastLoadedDocument));
  }
  catch (error) {
    // Handle query error
    yield put(setLoadError(error));
  }
  finally {
    // Set isLoadingMore flag to false
    yield put(setIsLoadingMore(false));
  }
}

function* watch() {
  yield takeEvery(INITIAL_LOAD, initialLoadSaga);
  yield takeEvery(LOAD_MORE, loadMoreSaga);
}

export default watch;