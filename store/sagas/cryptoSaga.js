
import { call, put, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { updateCryptoData, setLoading, setError } from '../slices/dataSlice';

function createWebSocketChannel() {
  return eventChannel((emit) => {
    const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin');

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Emit the parsed data directly
        emit(data);
      } catch (error) {
        emit({ type: 'error', message: error.message });
      }
    };

    socket.onerror = (error) => {
      emit({ type: 'error', message: error.message });
    };

    // Unsubscribe function
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
      try {
        const data = yield call(() => new Promise(channel.take));
        if (data.type === 'error') {
          yield put(setError(data.message));
        } else {
          // Update crypto data in the Redux store
          yield put(updateCryptoData(data));
        }
      } catch (innerError) {
        yield put(setError(`Data processing error: ${innerError.message}`));
        break;
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
