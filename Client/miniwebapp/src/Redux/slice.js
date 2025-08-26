import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Utils/axiosInstance";

export const fetchAllRepositories = createAsyncThunk(
  "repo/fetchAllRepositories",
  async ({ page = 1, limit = 6 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/getAllRepo?page=${page}&limit=${limit}`);
      return {
        data: response.data.data || [],
        total: response.data.pagination.total || 0,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchRepositories = createAsyncThunk(
  "repo/fetchRepositories",
  async ({ query, page = 1, limit = 6 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/search?keyword=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const ReposSlice = createSlice({
  name: "repo",
  initialState: {
    repos: [],  
    isLoading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    lastQuery: "",
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRepositories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllRepositories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.repos = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(fetchAllRepositories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch all repositories";
      });

    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRepositories.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch repositories";
      });
  },
});

export const { setCurrentPage } = ReposSlice.actions;
export default ReposSlice.reducer;
