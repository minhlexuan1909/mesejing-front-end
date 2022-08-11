import { createAsyncThunk } from "@reduxjs/toolkit";
import UserProfileAPI from "../../api/user/UserProfileAPI";

export const getUserByIdThunk = createAsyncThunk(
  "userSearch/getUserById",
  async (data, { rejectWithValue }) => {
    const { userId, token } = data;
    try {
      const res = UserProfileAPI.getUserById(token, userId);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
