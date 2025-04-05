import { call, put, takeLatest, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { updateCryptoData, setLoading, setError } from '../slices/dataSlice';

function createWebSocketChannel() {
  return eventChannel((emit) => {
    const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin');

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        emit(data); // Just emit the parsed object, e.g. { bitcoin: "64513.34" }
      } catch (error) {
        emit({ type: 'error', message: error.message });
      }
    };

    socket.onerror = (error) => {
      emit({ type: 'error', message: error.message });
    };

    return () => {
      socket.close();
    };
  });
}

function* fetchCryptoData() {
  try {
    yield put(setLoading(true));
    const channel = yield call(createWebSocketChannel);

    while (true) {
      const data = yield take(channel); // ✅ Correct usage

      if (data.type === 'error') {
        yield put(setError(data.message));
        break;
      } else {
        yield put(updateCryptoData(data));
      }
    }
  } catch (error) {
    yield put(setError('WebSocket connection failed'));
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchCryptoData() {
  yield takeLatest('data/fetchCryptoData', fetchCryptoData);
}
