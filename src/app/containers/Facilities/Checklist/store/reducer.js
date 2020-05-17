// Actions
import { ADD_CHECKLIST_DATA } from "containers/Facilities/Checklist/store/actions";


const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case ADD_CHECKLIST_DATA: {
      const { data } = payload;

      const newState = {
        ...state,
        data: {
          ...state.data,
          ...data
        }
      };

      return newState;
    }

    default:
      return state;

  }
}