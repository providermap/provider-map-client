// Actions
import { INITIAL_LOAD_SUCCESS, LOAD_MORE_SUCCESS, SET_IS_LOADING, SET_IS_LOADING_MORE, SET_HAS_MORE, SET_LOAD_ERROR } from "store/query/actions";


const initialState = {
  items: [],
  lastLoadedDocument: null,
  isLoading: true,
  isLoadingMore: false,
  hasMore: true,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case INITIAL_LOAD_SUCCESS: {
      const { items, pageSize, lastLoadedDocument } = payload;

      console.log("pageSize", pageSize)

      return {
        ...state,
        items,
        lastLoadedDocument,
        error: null
      };
    }

    case LOAD_MORE_SUCCESS: {
      const { items, pageSize, lastLoadedDocument } = payload;

      console.log("pageSize", pageSize)

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