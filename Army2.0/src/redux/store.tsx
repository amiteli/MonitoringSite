import { configureStore } from "@reduxjs/toolkit";
import fetchingData from "./fetchingData";

export default configureStore({
  reducer: {
    fetchingData: fetchingData,
  },
});
