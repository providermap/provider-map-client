import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import md5 from "md5";

// Action Creators
import { load } from "utils/hooks/useGeoFirestoreQuery/store/actions";

// Selectors
import { getItems, getIsLoading, getError } from "utils/hooks/useGeoFirestoreQuery/store/selectors";

// Hooks
import useResetReducerOnUnmount from "utils/hooks/useResetReducerOnUnmount";

// Reducer Name
import { reducerName } from "utils/hooks/useGeoFirestoreQuery/store/reducer";


const useGeoFirestoreQuery = (query, shouldLoadData = true, filters = null) => {

  useResetReducerOnUnmount(reducerName);

  const dispatch = useDispatch();

  // Load initial query documents when filters change (use md5 hash to tell when filters have changed)
  useEffect(() => {

    if (shouldLoadData) {
      dispatch(load(query));
    }

  }, [md5(JSON.stringify(filters))]);

  // Get values from redux store
  const items = useSelector(getItems);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  return {
    items,
    isLoading,
    error
  };
}

export default useGeoFirestoreQuery;