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

export const getMyInvestments = createAsyncThunk(
  "/investments/myInvestments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/my-investments");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const initialState = {
  myInvestments: [],
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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(invest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(invest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getMyInvestments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getMyInvestments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myInvestments = action.payload;
      })

      .addCase(getMyInvestments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default investSlice.reducer;
