import { firestore } from "firebase/app";
import { createStructuredSelector, createSelector } from "reselect";


const getLocationState = (state) => state.location;
const getLatitude = (state) => getLocationState(state).latitude;
const getLongitude = (state) => getLocationState(state).longitude;
export const getError = (state) => getLocationState(state).error;

export const getLocation = createStructuredSelector({
  latitude: getLatitude,
  longitude: getLongitude,
});

export const getAreLocationServicesEnabled = createSelector(
  [getLatitude, getLongitude],
  (latitude, longitude) => (latitude != null && longitude != null)
);

export const getGeoLocation = createSelector(
  [getLatitude, getLongitude, getAreLocationServicesEnabled],
  (latitude, longitude, areLocationServicesEnabled) => areLocationServicesEnabled ? new firestore.GeoPoint(latitude, longitude) : null
);