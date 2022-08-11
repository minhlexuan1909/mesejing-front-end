import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthAPI from "../api/AuthAPI";

export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (data, { rejectWithValue }) => {
    // return AuthAPI.login(data);
    const { ...apiData } = data;
    try {
      const res = await AuthAPI.login(apiData);
      // console.log(res);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/registerThunk",
  async (data, { rejectWithValue }) => {
    const { ...apiData } = data;
    try {
      const res = await AuthAPI.register(apiData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const confirmEmailThunk = createAsyncThunk(
  "auth/confirmEmailThunk",
  async (data, { rejectWithValue }) => {
    const { ...apiData } = data;
    try {
      const res = await AuthAPI.confirmEmail(apiData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPasswordThunk",
  async (data, { rejectWithValue }) => {
    const { ...apiData } = data;
    try {
      const res = await AuthAPI.forgotPassword(apiData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const confirmEmailPasswordThunk = createAsyncThunk(
  "auth/confirmEmailPassword",
  async (data, { rejectWithValue }) => {
    const { ...apiData } = data;
    try {
      const res = await AuthAPI.confirmEmailPassword(apiData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    const { ...apiData } = data;
    try {
      const res = await AuthAPI.resetPassword(apiData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const resendOtpEmailThunk = createAsyncThunk(
  "auth/resendOtpEmailThunk",
  async (data, { rejectWithValue }) => {
    const { ...apiData } = data;
    try {
      const res = await AuthAPI.resendOtpEmail(apiData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const resendOtpPasswordThunk = createAsyncThunk(
  "auth/resendOtpPasswordThunk",
  async (data, { rejectWithValue }) => {
    const { ...apiData } = data;
    try {
      const res = await AuthAPI.resendOtpPassword(apiData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getMeThunk = createAsyncThunk(
  "auth/getMeThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AuthAPI.getMe(data);
      // console.log(res);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
