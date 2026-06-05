import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../../libs/axios";

export const getDashboardStats = createAsyncThunk(
  "/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/admin/dashboard");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const getUsersByRole = createAsyncThunk(
  "/users",
  async (role, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/admin/users/${role}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const getUserPortfolio = createAsyncThunk(
  "/portfolio",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/admin/portfolio/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    stats: [],
    users: [],
    userPortfolio: null,
    isLoading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.stats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUsersByRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsersByRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(getUsersByRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserPortfolio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserPortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userPortfolio = action.payload;
      })
      .addCase(getUserPortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
