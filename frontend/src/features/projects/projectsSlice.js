import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getMyProjects = createAsyncThunk(
  "projects/myProjects",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/my-projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  myProjects: [],
  isLoading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getMyProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myProjects = action.payload;
      })
      .addCase(getMyProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default projectsSlice.reducer;
