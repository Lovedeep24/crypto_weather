import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  details: null,
  loading: false,
  error: null,
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    fetchDetails: (state, action) => {
      state.loading = true;
    },
    fetchDetailsSuccess: (state, action) => {
      state.details = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDetails, fetchDetailsSuccess, fetchDetailsFailure } = detailsSlice.actions;
export default detailsSlice.reducer;
