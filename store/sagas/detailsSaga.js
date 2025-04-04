
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDetails, fetchDetailsSuccess, fetchDetailsFailure } from '../slices/detailsSlice';

function* fetchDetailsSaga(action) {
  try {
    const response = yield call(fetch, `/api/details/${action.payload}`);
    const data = yield response.json();
    yield put(fetchDetailsSuccess(data));
  } catch (error) {
    yield put(fetchDetailsFailure(error.message));
  }
}

export function* watchFetchDetails() {
  yield takeLatest(fetchDetails.type, fetchDetailsSaga);
}