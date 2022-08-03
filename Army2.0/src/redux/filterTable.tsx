import { ActionTypes } from "@mui/base";
import { createSlice } from "@reduxjs/toolkit";
import { Action } from "react-query/types/core/query";

//Create Global State To Change The Filter In Pure Table
const filterTableSlice = createSlice({
  name: "filterTable",
  initialState: {
    items: [],
  },
  reducers: {
    setData: (state, action) => {
      action.payload.columnField.length
        ? (state.items = [
            {
              columnField:action.payload.columnField,
              operatorValue: action.payload.operatorValue,
              value: action.payload.value,
            },
          ])
        : (state.items = []);
    },
  },
});

export const { setData } = filterTableSlice.actions;

export default filterTableSlice.reducer;
