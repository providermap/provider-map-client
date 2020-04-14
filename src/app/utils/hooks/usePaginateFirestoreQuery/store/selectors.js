// Selectors
const getQueryState = (state) => state.paginateQuery;

export const getItems = (state) => getQueryState(state).items;
export const getLastLoadedDocument = (state) => getQueryState(state).lastLoadedDocument;
export const getIsLoading = (state) => getQueryState(state).isLoading;
export const getIsLoadingMore = (state) => getQueryState(state).isLoadingMore;
export const getHasMore = (state) => getQueryState(state).hasMore;
export const getError = (state) => getQueryState(state).error;