import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: "",
  error: "",
};

export const fetchData = createAsyncThunk(
  "userController/fetchUserController",
  () => {
    return axios
      .get("https://userControllerLocation")
      .then((response) => response.data);
  }
);

const userControllerSlice: any = createSlice({
  name: "userController",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = "";
      state.error = action.error.message ? action.error.message : "";
    });
  },
  reducers: {},
});

export default userControllerSlice.reducer;
