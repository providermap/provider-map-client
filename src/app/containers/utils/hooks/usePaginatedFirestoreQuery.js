import { useReducer, useEffect } from "react";

const initialState = {
  hasMore: false,
  after: null,
  cursor: 0,
  limit: 0,
  items: [],
  lastLoaded: null,
  loading: true,
  loadingError: true,
  loadingMore: false,
  initialLoad: true
};

const reducer = (state = initialState, action) => {

  // Get action type and payload
  const { type, payload } = action;

  switch (type) {

    case "INITIAL_LOAD_SUCCESS": {

      const nextLimit = payload.items.length + payload.limit;
      const end = payload.items.length < payload.limit || nextLimit === state.limit;

      return {
        ...state,
        hasMore: !end || state.hasMore,
        limit: nextLimit,
        loading: false,
        loadingError: null,
        lastLoaded: payload.lastLoaded,
        loadingMore: false,
        items: payload.items,
        cursor: state.cursor + payload.limit
      };
    }

    case "LOAD_SUCCESS": {
      const existingItems = [ ...state.items ];

      const nextLimit = existingItems.length + payload.limit;
      const end = existingItems.length < payload.limit || nextLimit === state.limit;

      return {
        ...state,
        hasMore: !end || state.hasMore,
        limit: nextLimit,
        loading: false,
        loadingError: null,
        lastLoaded: payload.lastLoaded,
        loadingMore: false,
        items: existingItems.concat(payload.items),
        cursor: state.cursor + payload.limit
      };
    }

    case "LOAD_FAILURE": {
      return {
        ...state,
        items: [],
        loadingError: payload.error
      }
    }

    case "LOAD_MORE": {
      return {
        ...state,
        loadingMore: true,
      };
    }

  }
}


const usePaginatedFirestoreQuery = (query, limit = 25, filters) => {
  console.log("usePaginatedFirestoreQuery -> query", query)

  const [ state, dispatch ] = useReducer(reducer, initialState);
  console.log("usePaginatedFirestoreQuery -> state", state)

  const fetchFacilities = async () => {
    try {
      if (state.loadingMore) {
        const snapshot = await query.startAfter(state.lastLoaded).limit(20).get();

        const lastLoaded = snapshot.docs[snapshot.docs.length - 1];

        const items = snapshot.docs.map((doc => doc.data()));
        console.log("fetchFacility -> items", items)

        // Dispatch load success action
        dispatch({ type: "LOAD_SUCCESS", payload: { items, lastLoaded } });

      }
    } catch (error) {
      // Dispatch load failure action
      dispatch({ type: "LOAD_FAILURE", payload: { error } });
    }
  }

  const fetchInitialFacilities = async () => {
    try {
      const snapshot = await query.limit(limit).get();

      const lastLoaded = snapshot.docs[snapshot.docs.length - 1];

      const items = snapshot.docs.map((doc => doc.data()));

      // Dispatch load success action
      dispatch({ type: "INITIAL_LOAD_SUCCESS", payload: { items, lastLoaded } });
    } catch (error) {
      // Dispatch load failure action
      dispatch({ type: "LOAD_FAILURE", payload: { error } });
    }
  }

  useEffect(() => void fetchInitialFacilities(), [filters.facilityType, filters.traumaType]);

  useEffect(() => void fetchFacilities(), [state.loadingMore]);

  // Trigger firebase to load more data
  const loadMore = () => dispatch({ type: "LOAD_MORE" });

  return {
    loadingMore: state.loadingMore,
    loadingError: state.loadingError,
    loadingMoreError: state.loadingMoreError,
    loading: state.loading,
    hasMore: state.hasMore,
    items: state.items,
    loadMore,
  };
}

export default usePaginatedFirestoreQuery;