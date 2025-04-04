"use client";
import { all } from 'redux-saga/effects';
import { watchFetchData  } from './dataSaga';
import { watchCryptoData } from './cryptoSaga';
export default function* rootSaga() {
  yield all([watchFetchData(), watchCryptoData()]);
}
