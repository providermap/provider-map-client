// Selectors for connected-react-router store

export const getRouterState = (state) => state && state.router;
const getLocation = (state) => getRouterState(state) && getRouterState(state).location;

export const getRouterPathname = (state) => getLocation(state).pathname;
export const getRouterSearch = (state) => getLocation(state).search;
export const getRouterHash = (state) => getLocation(state).hash;
export const getRouterKey = (state) => getLocation(state).key;

export const pathnameIncludes = (location) => (state) => getRouterPathname(state) && getRouterPathname(state).includes(location);