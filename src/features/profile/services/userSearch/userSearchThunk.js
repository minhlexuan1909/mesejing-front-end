import { createAsyncThunk } from "@reduxjs/toolkit";
import UserProfileAPI from "../../api/user/UserProfileAPI";

export const searchUserThunk = createAsyncThunk(
  "userSearch/searchUser",
  async (data, { rejectWithValue }) => {
    const { token, keyword, page } = data;
    try {
      const res = UserProfileAPI.searchUser(keyword, page, token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
