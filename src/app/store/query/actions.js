import { createAction } from "redux-actions";


export const INITIAL_LOAD = "QUERY/INITIAL_LOAD";
export const initialLoad = (query, pageSize) => createAction(INITIAL_LOAD)({ query, pageSize });

export const INITIAL_LOAD_SUCCESS = "QUERY/INITIAL_LOAD_SUCCESS";
export const initialLoadSuccess = (items, pageSize, lastLoadedDocument) => createAction(INITIAL_LOAD_SUCCESS)({ items, pageSize, lastLoadedDocument });

export const LOAD_MORE = "QUERY/LOAD_MORE";
export const loadMore = (query, pageSize) => createAction(LOAD_MORE)({ query, pageSize });

export const LOAD_MORE_SUCCESS = "QUERY/LOAD_MORE_SUCCESS";
export const loadMoreSuccess = (items, pageSize, lastLoadedDocument) => createAction(LOAD_MORE_SUCCESS)({ items, pageSize, lastLoadedDocument });

export const SET_IS_LOADING = "QUERY/SET_IS_LOADING";
export const setIsLoading = (isLoading) => createAction(SET_IS_LOADING)({ isLoading });

export const SET_IS_LOADING_MORE = "QUERY/SET_IS_LOADING_MORE";
export const setIsLoadingMore = (isLoadingMore) => createAction(SET_IS_LOADING_MORE)({ isLoadingMore });

export const SET_HAS_MORE = "QUERY/SET_HAS_MORE";
export const setHasMore = (hasMore) => createAction(SET_HAS_MORE)({ hasMore });

export const SET_LOAD_ERROR = "QUERY/LOAD_FAILURE";
export const setLoadError = (error) => createAction(SET_LOAD_ERROR)({ error });