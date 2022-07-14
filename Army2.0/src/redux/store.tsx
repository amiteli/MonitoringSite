import { configureStore } from "@reduxjs/toolkit";
import fetchingData from "./fetchingData";
import filterTableReducer from "./filterTable"

export default configureStore({
  reducer: {
    fetchingData: fetchingData,
    filterTable: filterTableReducer,
  },
});
