import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../../libs/axios";

export const invest = createAsyncThunk(
  "/invest",
  async (investementData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/invest", investementData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const investSlice = createSlice({
  name: "invest",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(invest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(invest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(invest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default investSlice.reducer;
