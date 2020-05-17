// Actions
import { UPDATE_USER_LOCATION } from "containers/LocationProvider/store/locationProviderActions";


const initialState = {
  latitude: null,
  longitude: null,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch(type) {

    case UPDATE_USER_LOCATION: {
      const { latitude, longitude, error } = payload;

      return {
        latitude,
        longitude,
        error
      };
    }

    default:
      return state;

  }
}