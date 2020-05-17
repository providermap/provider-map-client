import { createAction } from "redux-actions";


export const ADD_CHECKLIST_DATA = "FACILITIES/CHECKLIST/DATA/ADD";
export const addChecklistData = (data) => createAction(ADD_CHECKLIST_DATA)({ data });

export const GENERATE_CHECKLIST_DATA_PDF = "FACILITIES/CHECKLIST/DATA/GENERATE_PDF";
export const generateChecklistDataPDF = (data) => createAction(GENERATE_CHECKLIST_DATA_PDF)({ data });
