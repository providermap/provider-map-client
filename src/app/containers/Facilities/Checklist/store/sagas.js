import { takeEvery, call, put } from "redux-saga/effects";
import jsPDF from "jspdf";


// Actions
import { GENERATE_CHECKLIST_DATA_PDF } from "containers/Facilities/Checklist/store/actions";
import { push } from "connected-react-router";


function* generateChecklistDataPdfSaga({ payload: { data } }) {
  try {
    // Construct PDF with checklist form data
    let doc = new jsPDF("p", "pt");

    yield call(doc.setFont, "courier");
    yield call(doc.setFontType, "normal");

    // Spacing counter
    let i = 0;

    for (let [key, value] of Object.entries(data)) {
      if (!Array.isArray(value)) {
        doc.text(20, (20 + (i*20)), `${key}: ${value}`);
      } else {
        doc.text(20, (20 + (i*20)), `${key}: ${value.join(", ")}`);
      }
      // Increment spacing counter
      i++;
    }

    // Save the Data
    yield call(doc.save, "PatientChecklist.pdf");

    // Navigate to facilities page with query params
    yield put(push(`/facility/all?zip=${data?.zip}&facilityType=${data?.facilityType}`));
  }
  catch (error) {
    // Handle query error
    // yield put(setLoadError(error));
  }
  finally {
    // Set isLoadingMore flag to false
    // yield put(setIsLoadingMore(false));
  }
}

function* watch() {
  yield takeEvery(GENERATE_CHECKLIST_DATA_PDF, generateChecklistDataPdfSaga);
}

export default watch;