// Actions
import { LOAD_SUCCESS, SET_IS_LOADING, SET_LOAD_ERROR } from "utils/hooks/useGeoFirestoreQuery/store/actions";

// Utils
import { resetReducer } from "utils/hooks/useResetReducerOnUnmount";


const initialState = {
  items: [],
  isLoading: false,
  error: null
};

const GeoFirestoreQueryReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case LOAD_SUCCESS: {
      const { items } = payload;

      return {
        ...state,
        items
      };
    }

    case SET_IS_LOADING: {
      const { isLoading } = payload;

      return {
        ...state,
        isLoading
      };
    }

    case SET_LOAD_ERROR: {
      const { error } = payload;

      return {
        ...state,
        items: [],
        error,
        isLoading: false
      };
    }

    default:
      return state;

  }
}

export const reducerName = "geoFirestoreQueryReducer";

export default resetReducer(GeoFirestoreQueryReducer, reducerName);