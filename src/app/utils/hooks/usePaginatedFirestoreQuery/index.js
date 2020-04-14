import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import md5 from "md5";

// Action Creators
import { initialLoad, loadMore } from "utils/hooks/usePaginatedFirestoreQuery/store/actions";

// Selectors
import { getItems, getIsLoading, getIsLoadingMore, getHasMore, getError } from "utils/hooks/usePaginatedFirestoreQuery/store/selectors";


const usePaginatedFirestoreQuery = (query, pageSize = 20, filters) => {

  const dispatch = useDispatch();

  // Load initial query documents when filters change (use md5 hash to tell when filters have changed)
  useEffect(() => void dispatch(initialLoad(query, pageSize)), [md5(JSON.stringify(filters))]);

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