import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import md5 from "md5";

// Action Creators
import { load } from "utils/hooks/useGeoFirestoreQuery/store/actions";

// Selectors
import { getItems, getIsLoading, getError } from "utils/hooks/useGeoFirestoreQuery/store/selectors";


const usePaginatedFirestoreQuery = (query, pageSize = 20, filters) => {

  const dispatch = useDispatch();

  // Load initial query documents when filters change (use md5 hash to tell when filters have changed)
  useEffect(() => void dispatch(load(query, pageSize)), [md5(JSON.stringify(filters))]);

  // Get values from redux store
  const items = useSelector(getItems);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  return {
    items,
    isLoading,
    error,
  };
}

export default usePaginatedFirestoreQuery;