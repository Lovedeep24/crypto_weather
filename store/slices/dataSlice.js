
import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    weather: null,
    crypto: null,
    news: null,
    loading: false,
    error: null,
    webCrypto:null
  },
  reducers: {
    fetchData: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.weather = action.payload.weather;
      state.news = action.payload.news.results;
      state.crypto = action.payload.crypto;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCryptoData: (state, action) => {
      state.webCrypto = { ...state.webCrypto, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchData,
  fetchDataSuccess,
  fetchDataFailure,
  updateCryptoData,
  setLoading,
  setError,
} = dataSlice.actions;

export default dataSlice.reducer;
