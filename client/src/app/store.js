import { configureStore } from "@reduxjs/toolkit";
import hospitalReducer from "../containers/FindHospitalsPage/hospital.slice";

export const store = configureStore({
  reducer: {
    hospital: hospitalReducer,
  },
});
