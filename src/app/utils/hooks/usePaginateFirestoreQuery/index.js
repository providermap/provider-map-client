import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import md5 from "md5";

// Action Creators
import { initialLoad, loadMore } from "utils/hooks/usePaginateFirestoreQuery/store/actions";

// Selectors
import { getItems, getIsLoading, getIsLoadingMore, getHasMore, getError } from "utils/hooks/usePaginateFirestoreQuery/store/selectors";

// Hooks
import useResetReducerOnUnmount from "utils/hooks/useResetReducerOnUnmount";

// Reducer Name
import { reducerName } from "utils/hooks/usePaginateFirestoreQuery/store/reducer";


const usePaginatedFirestoreQuery = (query, pageSize = 20, shouldLoadData = true, filters = null) => {

  useResetReducerOnUnmount(reducerName);

  const dispatch = useDispatch();

  // Load initial query documents when filters change (use md5 hash to tell when filters have changed)
  useEffect(() => {

    if (shouldLoadData) {
      dispatch(initialLoad(query, pageSize));
    }

  }, [md5(JSON.stringify(filters))]);

  // Get values from redux store
  const items = useSelector(getItems);
  const isLoading = useSelector(getIsLoading);
  const isLoadingMore = useSelector(getIsLoadingMore);
  const hasMore = useSelector(getHasMore);
  const error = useSelector(getError);

  // Callback function to load next batch of paginated documents
  const loadMoreResults = useCallback(() => void dispatch(loadMore(query, pageSize)), [query, pageSize]);

  return {
    items,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadMoreResults
  };
}

export default usePaginatedFirestoreQuery;