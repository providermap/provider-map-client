// Actions
import { INITIAL_LOAD_SUCCESS, LOAD_MORE_SUCCESS, SET_IS_LOADING, SET_IS_LOADING_MORE, SET_HAS_MORE, SET_LOAD_ERROR } from "utils/hooks/usePaginateFirestoreQuery/store/actions";

// Utils
import { resetReducer } from "utils/hooks/useResetReducerOnUnmount";


const initialState = {
  items: [],
  lastLoadedDocument: null,
  isLoading: true,
  isLoadingMore: false,
  hasMore: true,
  error: null
};

const PaginatedFirestoreQueryReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case INITIAL_LOAD_SUCCESS: {
      const { items, lastLoadedDocument } = payload;

      return {
        ...state,
        items,
        lastLoadedDocument,
        error: null
      };
    }

    case LOAD_MORE_SUCCESS: {
      const { items, lastLoadedDocument } = payload;

      // Clone existing items into new array to not mutate redux state
      const existingItems = [ ...state.items ];

      return {
        ...state,
        items: existingItems.concat(items),
        lastLoadedDocument,
        error: null
      };
    }

    case SET_IS_LOADING: {
      const { isLoading } = payload;

      return {
        ...state,
        isLoading
      };
    }

    case SET_IS_LOADING_MORE: {
      const { isLoadingMore } = payload;

      return {
        ...state,
        isLoadingMore
      };
    }

    case SET_HAS_MORE: {
      const { hasMore } = payload;

      return {
        ...state,
        hasMore
      };
    }

    case SET_LOAD_ERROR: {
      const { error } = payload;

      return {
        ...state,
        items: [],
        error
      };
    }

    default:
      return state;

  }
}

export const reducerName = "PaginatedFirestoreQueryReducer";

export default resetReducer(PaginatedFirestoreQueryReducer, reducerName);