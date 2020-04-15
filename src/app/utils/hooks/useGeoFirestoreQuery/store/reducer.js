// Actions
import {
  LOAD_SUCCESS,
  SET_IS_LOADING,
  SET_LOAD_ERROR
} from "utils/hooks/useGeoFirestoreQuery/store/actions";


const initialState = {
  items: [],
  isLoading: true,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case LOAD_SUCCESS: {
      const { items } = payload;

      return {
        ...state,
        items,
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