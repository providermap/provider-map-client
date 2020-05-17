// Selectors
const getQueryState = (state) => state.geoQuery;

export const getItems = (state) => getQueryState(state).items;
export const getIsLoading = (state) => getQueryState(state).isLoading;
export const getError = (state) => getQueryState(state).error;