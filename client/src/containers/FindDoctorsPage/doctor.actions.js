import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDoctor, searchDoctor } from "./doctor.api";

export const fetchDoctorAsync = createAsyncThunk(
  "doctor/fetchDoctor",
  async () => {
    const response = await fetchDoctor();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const searchDoctorAsync = createAsyncThunk(
  "doctor/searchDoctor",
  async (name) => {
    const response = await searchDoctor(name);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
