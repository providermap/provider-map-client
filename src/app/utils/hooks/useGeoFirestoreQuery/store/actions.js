import { createAction } from "redux-actions";


export const LOAD = "GEO_FIRESTORE_QUERY/LOAD";
export const load = (query, pageSize) => createAction(LOAD)({ query, pageSize });

export const LOAD_SUCCESS = "GEO_FIRESTORE_QUERY/LOAD_SUCCESS";
export const loadSuccess = (items) => createAction(LOAD_SUCCESS)({ items });

export const SET_IS_LOADING = "GEO_FIRESTORE_QUERY/SET_IS_LOADING";
export const setIsLoading = (isLoading) => createAction(SET_IS_LOADING)({ isLoading });

export const SET_LOAD_ERROR = "GEO_FIRESTORE_QUERY/LOAD_FAILURE";
export const setLoadError = (error) => createAction(SET_LOAD_ERROR)({ error });