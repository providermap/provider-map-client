// Selectors
const getChecklistState = (state) => state.checklist;

export const getChecklistData = (state) => getChecklistState(state)?.data;