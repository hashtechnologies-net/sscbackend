import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctorAsync, searchDoctorAsync } from "./doctor.actions";

const initialState = {
  doctorList: [],
  doctorListLoading: false,
  doctorListSuccess: false,
  doctorListError: "",
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorAsync.pending, (state) => {
        state.doctorListLoading = true;
        state.doctorListSuccess = false;
        state.doctorList = [];
      })
      .addCase(fetchDoctorAsync.fulfilled, (state, action) => {
        state.doctorListLoading = false;
        state.doctorListSuccess = true;
        state.doctorList = action.payload.data;
      })
      .addCase(fetchDoctorAsync.rejected, (state, action) => {
        state.doctorListLoading = false;
        state.doctorListSuccess = false;
        state.doctorListError = action.error.message;
        state.doctorList = [];
      })
      .addCase(searchDoctorAsync.pending, (state) => {
        state.doctorListLoading = true;
        state.doctorListSuccess = false;
        state.doctorList = [];
      })
      .addCase(searchDoctorAsync.fulfilled, (state, action) => {
        state.doctorListLoading = false;
        state.doctorListSuccess = true;
        state.doctorList = action.payload.data;
      })
      .addCase(searchDoctorAsync.rejected, (state, action) => {
        state.doctorListLoading = false;
        state.doctorListSuccess = false;
        state.doctorListError = action.error.message;
        state.doctorList = [];
      });
  },
});

export default doctorSlice.reducer;
