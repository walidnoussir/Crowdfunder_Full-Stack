import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../libs/axios";

const API_URL = import.meta.env.VITE_API_URL;

// 1. Thunk pour le Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Erreur lors de la connexion");

      // Stocker le token dans le localStorage
      localStorage.setItem("token", data.token);
      return data; // Doit contenir { token, user } ou juste le token selon l'API
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// 2. Thunk pour le Register (Avec le champ role)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Erreur lors de l'inscription");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch user");
      return data; // should return the user object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addBalance = createAsyncThunk(
  "/balance",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await axiosApi.put("/balance", {
        amount,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    balance: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        // state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isLoading = false;
        localStorage.removeItem("token");
      })
      .addCase(addBalance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.balance = action.payload.currentBalance;
      })
      .addCase(addBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
