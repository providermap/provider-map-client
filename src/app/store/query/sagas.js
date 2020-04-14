import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { batchActions } from "redux-batched-actions";

// Actions
import { INITIAL_LOAD, LOAD_MORE } from "store/query/actions";

// Action Creators
import { initialLoadSuccess, loadMoreSuccess, setIsLoading, setIsLoadingMore, setHasMore, setLoadError } from "store/query/actions";

// Selectors
import { getLastLoadedDocument } from "store/query/selectors";

// Utils
import { rsf } from "utils/firebase";


// Helper functions
const findLastLoadedDocument = (results) => results.docs[results.docs.length - 1];

const generateItemsFromResults = (results) => results.docs.map(doc => doc.data());

// TODO: Discuss just using our own async get lambdas
const getSnapshotAsync = async (query) => await query.get();


function* initialLoadSaga({ payload: { query, pageSize } }) {
  try {
    yield put(batchActions([
      // Set isLoading flag to true
      setIsLoading(true),

      // Reset hasMore flag to true
      setHasMore(true)
    ]));

    // Make query call
    const results = yield call(
      getSnapshotAsync,
      query.limit(pageSize)
    );

    // Find last loaded document
    const lastLoadedDocument = yield call(findLastLoadedDocument, results);

    // Iterate through results and get data to normalize output
    const items = yield call(generateItemsFromResults, results);

    // If loaded results is less than page size, there are no more results
    if (results.docs.length < pageSize) {
      yield put(setHasMore(false));
    }

    // Save loaded items in redux store
    yield put(initialLoadSuccess(items, lastLoadedDocument));
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
    const lastLoadedDocument = yield call(findLastLoadedDocument, results);

    // Iterate through documents and get data to normalize output
    const items = yield call(generateItemsFromResults, results);

    // If loaded results is less than page size, there are no more results
    if (results.docs.length < pageSize) {
      yield put(setHasMore(false));
    }

    // Save loaded items in redux store
    yield put(loadMoreSuccess(items, lastLoadedDocument));
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
  yield takeLatest(INITIAL_LOAD, initialLoadSaga);
  yield takeEvery(LOAD_MORE, loadMoreSaga);
}

export default watch;