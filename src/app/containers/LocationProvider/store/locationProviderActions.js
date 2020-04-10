import { createAction } from "redux-actions";


export const UPDATE_USER_LOCATION = "LOCATION_PROVIDER/UPDATE_USER_LOCATION";
export const updateUserLocation = (latitude, longitude, error) => createAction(UPDATE_USER_LOCATION)({ latitude, longitude, error });