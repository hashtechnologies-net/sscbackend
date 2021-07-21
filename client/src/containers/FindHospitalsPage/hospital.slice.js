import { createSlice } from "@reduxjs/toolkit";
import { fetchHospitalAsync, searchHospitalAsync } from "./hospital.actions";

const initialState = {
  hospitalList: [],
  hospitalListLoading: false,
  hospitalListSuccess: false,
  hospitalListError: "",
};

export const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchHospitalAsync.pending, (state) => {
        state.hospitalListLoading = true;
        state.hospitalListSuccess = false;
        state.hospitalList = [];
      })
      .addCase(fetchHospitalAsync.fulfilled, (state, action) => {
        state.hospitalListLoading = false;
        state.hospitalListSuccess = true;
        state.hospitalList = action.payload.data;
      })
      .addCase(fetchHospitalAsync.rejected, (state, action) => {
        state.hospitalListLoading = false;
        state.hospitalListSuccess = false;
        state.hospitalListError = action.error.message;
        state.hospitalList = [];
      })
      .addCase(searchHospitalAsync.pending, (state) => {
        state.hospitalListLoading = true;
        state.hospitalListSuccess = false;
        state.hospitalList = [];
      })
      .addCase(searchHospitalAsync.fulfilled, (state, action) => {
        state.hospitalListLoading = false;
        state.hospitalListSuccess = true;
        state.hospitalList = action.payload.data;
      })
      .addCase(searchHospitalAsync.rejected, (state, action) => {
        state.hospitalListLoading = false;
        state.hospitalListSuccess = false;
        state.hospitalListError = action.error.message;
        state.hospitalList = [];
      });
  },
});

export default hospitalSlice.reducer;
