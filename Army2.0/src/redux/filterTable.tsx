import { createSlice } from "@reduxjs/toolkit";

const filterTableSlice = createSlice({
  name: "filterTable",
  initialState: {
    items: [],
    // items: [
    //   {
    //     columnField: "שם רכיב",
    //     operatorValue: "contains",
    //     value: "",
    //   },
    // ],
    // columnField: null
  },
  reducers: {
    setData: (state, action) => {
      // console.log(action.payload.columnField.length);
      action.payload.columnField.length
        ? (state.items = [
            {
              columnField: action.payload.columnField,
              operatorValue: action.payload.operatorValue,
              // id: 32055,
              value: action.payload.value,
            },
          ])
        : (state.items = []);
      // state.items = action.payload;
      // state.columnField = action.payload.location
    },
  },
});

export const { setData } = filterTableSlice.actions;

export default filterTableSlice.reducer;
