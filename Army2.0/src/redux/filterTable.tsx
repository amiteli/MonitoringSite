import { createSlice } from "@reduxjs/toolkit";

const filterTableSlice = createSlice({
  name: "filterTable",
  initialState: {
    value: null,
    // columnField: null
  },
  reducers: {
    setData: (state, action) => {
      state.value = action.payload.location
      // state.columnField = action.payload.location
    }
  },
});


export const { setData } = filterTableSlice.actions;

export default filterTableSlice.reducer;
