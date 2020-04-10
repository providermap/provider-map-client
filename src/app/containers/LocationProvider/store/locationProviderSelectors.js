import { createStructuredSelector, createSelector } from "reselect";


const getLocationState = (state) => state.location;
const getLatitude = (state) => getLocationState(state).latitude;
const getLongitude = (state) => getLocationState(state).latitude;
const getError = (state) => getLocationState(state).error;

export const getLocation = createStructuredSelector({
  latitude: getLatitude,
  longitude: getLongitude,
  error: getError
});

export const getAreLocationServicesEnabled = createSelector(
  [getLatitude, getLongitude],
  (latitude, longitude) => (latitude && longitude)
);