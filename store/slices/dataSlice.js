"use client";
import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    weather: null,
    crypto: null,
    news: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchData: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.weather = action.payload.weather;
      state.crypto = action.payload.crypto;
      state.news = action.payload.news;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchData, fetchDataSuccess, fetchDataFailure } = dataSlice.actions;
export default dataSlice.reducer;
