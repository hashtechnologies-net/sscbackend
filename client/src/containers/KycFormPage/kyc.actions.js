import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPolicy } from "./kyc.api";

export const fetchPolicyAsync = createAsyncThunk(
  "policy/fetchPolicy",
  async () => {
    const response = await fetchPolicy();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
