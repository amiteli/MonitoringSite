import { createSlice } from "@reduxjs/toolkit";

const filterTableSlice = createSlice({
  name: "filterTable",
  initialState: {
    items: [
      {
        columnField: "",
        operatorValue: "",
        value: "",
      },
    ],
  },
  reducers: {
    setData: (state, action) => {
      state.items = [
        {
          columnField: action.payload.columnField,
          operatorValue: "contains",
          value: action.payload.value,
        }
      ];
      // state.columnField = action.payload.location
    },
  },
});

export const { setData } = filterTableSlice.actions;

export default filterTableSlice.reducer;
