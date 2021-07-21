import { createSlice } from "@reduxjs/toolkit";
import { fetchPolicyAsync } from "./policy.actions";

const initialState = {
  policyList: [],
  policyListLoading: false,
  policyListSuccess: false,
  policyListError: "",
};

export const policySlice = createSlice({
  name: "policy",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicyAsync.pending, (state) => {
        state.policyListLoading = true;
        state.policyListSuccess = false;
        state.policyList = [];
      })
      .addCase(fetchPolicyAsync.fulfilled, (state, action) => {
        state.policyListLoading = false;
        state.policyListSuccess = true;
        state.policyList = action.payload.data;
      })
      .addCase(fetchPolicyAsync.rejected, (state, action) => {
        state.policyListLoading = false;
        state.policyListSuccess = false;
        state.policyListError = action.error.message;
        state.policyList = [];
      })
      .addCase(searchPolicyAsync.pending, (state) => {
        state.policyListLoading = true;
        state.policyListSuccess = false;
        state.policyList = [];
      })
      .addCase(searchPolicyAsync.fulfilled, (state, action) => {
        state.policyListLoading = false;
        state.policyListSuccess = true;
        state.policyList = action.payload.data;
      })
      .addCase(searchPolicyAsync.rejected, (state, action) => {
        state.policyListLoading = false;
        state.policyListSuccess = false;
        state.policyListError = action.error.message;
        state.policyList = [];
      });
  },
});

export default policySlice.reducer;
