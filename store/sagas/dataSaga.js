"use client";
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchData, fetchDataSuccess, fetchDataFailure } from '../slices/dataSlice';

// Helper function to make API calls
const fetchApi = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data;
};

function* fetchDataSaga() {
  try {

    const weatherData = yield call(
      fetchApi,
      'http://api.openweathermap.org/data/2.5/group?id=5128581,2643743,2968815,1850147,2147714&units=metric&appid=19bc6668b6c7e4ca5481ce26e73a1c90'
    );
    const cryptoData = yield call(
      fetchApi,
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,cardano&x_cg_demo_api_key=CG-aqfsxqM7ypLK5VyDfEWfPRZF'
    );
    yield put(fetchDataSuccess({
      weather: weatherData,
      crypto: cryptoData,
    }));


  
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchFetchData() {
  yield takeLatest(fetchData.type, fetchDataSaga);
}
