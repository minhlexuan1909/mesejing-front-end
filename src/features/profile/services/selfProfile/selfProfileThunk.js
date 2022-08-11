import { createAsyncThunk } from "@reduxjs/toolkit";
import SelfProfileAPI from "../../api/self/SelfProfileAPI";

export const getMeThunk = createAsyncThunk(
  "selfProfile/getMe",
  async (data, { rejectWithValue }) => {
    try {
      const res = SelfProfileAPI.getMe(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const updateMyProfileThunk = createAsyncThunk(
  "selfProfile/updateMyProfileThunk",
  async (data, { rejectWithValue }) => {
    const { token, ...apiData } = data;
    try {
      const res = SelfProfileAPI.updateMyProfile(token, apiData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
