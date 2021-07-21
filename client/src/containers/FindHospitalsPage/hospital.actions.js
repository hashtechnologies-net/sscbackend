import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHospital, searchHospital } from "./hospital.api";

export const fetchHospitalAsync = createAsyncThunk(
  "hospital/fetchHospital",
  async () => {
    const response = await fetchHospital();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const searchHospitalAsync = createAsyncThunk(
  "hospital/searchHospital",
  async (name) => {
    const response = await searchHospital(name);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
