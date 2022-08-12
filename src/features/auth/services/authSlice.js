import { createSlice } from "@reduxjs/toolkit";
import {
  confirmEmailPasswordThunk,
  confirmEmailThunk,
  forgotPasswordThunk,
  getMeThunk,
  loginThunk,
  registerThunk,
  resetPassword,
} from "./authThunk";
import { toast } from "react-toastify";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    userId: null,
    username: null,
    isEmailConfirmed: null,
    emailOrUsername: null,
    // Check if user is using forgot password function to change the otp page's behavior
    isForgetPass: false,
    isForgetOtpConfirmed: false,

    isLoginSuccesful: false,
  },
  reducers: {
    setInitValue: (state, action) => {
      state.token = null;
      state.userId = null;
      state.isEmailConfirmed = null;
      state.emailOrUsername = null;
      // Check if user is using forgot password function to change the otp page's behavior
      state.isForgetPass = false;
      state.isForgetOtpConfirmed = false;
    },
    removeEmailOrUsername: (state, action) => {
      state.emailOrUsername = null;
    },
    setIsEmailConfirmed: (state, action) => {
      state.isEmailConfirmed = action.payload;
    },
    removeUser: (state, action) => {
      state.token = null;
      state.userId = null;
    },
    setIsForgetPass: (state, action) => {
      state.isForgetPass = action.payload;
    },
    setIsForgetOtpConfirmed: (state, action) => {
      state.isForgetOtpConfirmed = action.payload;
    },
    removeLocalToken: () => {
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state, action) => {
        state.emailOrUsername = action.meta.arg.emailOrUsername;
        state.isEmailConfirmed = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.data.token;
        state.isEmailConfirmed = true;
        state.isLoginSuccesful = true;
        localStorage.setItem("token", action.payload.data.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        // console.log(action.payload.data.error);
        // if (action.payload.data.hasOwnProperty("isEmailConfirmed")) {
        //   state.isEmailConfirmed = action.payload.data.isEmailConfirmed;
        // }
        state.isEmailConfirmed = action.payload.data.isEmailConfirmed;
        toast.error(action.payload.data.error);
      });

    builder
      .addCase(registerThunk.pending, (state, action) => {})
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.emailOrUsername = action.meta.arg.username;
        state.isEmailConfirmed = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        toast.error(action.payload.data.error);
      });

    builder
      .addCase(confirmEmailThunk.pending, (state, action) => {})
      .addCase(confirmEmailThunk.fulfilled, (state, action) => {
        state.isEmailConfirmed = true;
        state.token = action.payload.data.token;
        toast.success("Confirm email successfully ");
      })
      .addCase(confirmEmailThunk.rejected, (state, action) => {
        toast.error(action.payload.data.error);
      });

    builder
      .addCase(forgotPasswordThunk.pending, (state, action) => {
        state.emailOrUsername = action.meta.arg.emailOrUsername;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.isForgetPass = true;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        toast.error(action.payload.data.error);
      });

    builder
      .addCase(confirmEmailPasswordThunk.pending, (state, action) => {})
      .addCase(confirmEmailPasswordThunk.fulfilled, (state, action) => {
        state.isForgetOtpConfirmed = true;
      })
      .addCase(confirmEmailPasswordThunk.rejected, (state, action) => {
        toast.error(action.payload.data.error);
      });

    builder
      .addCase(resetPassword.pending, (state, action) => {})
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isForgetPass = null;
        state.isForgetOtpConfirmed = null;
        toast.success("Change password successfully");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        toast.error(action.payload.data.error);
      });

    builder.addCase(getMeThunk.fulfilled, (state, action) => {
      state.username = action.payload.data.user.username;
      state.userId = action.payload.data.user._id;
      state.isLoginSuccesful = true;
      state.isEmailConfirmed = true;
    });
  },
});

export default authSlice;

export const authAction = authSlice.actions;

export const tokenSelector = (state) => state.auth.token;
export const userIdSelector = (state) => state.auth.userId;
export const isEmailConfirmedSelector = (state) => state.auth.isEmailConfirmed;
export const emailOrUsernameSelector = (state) => state.auth.emailOrUsername;
export const isForgetPassSelector = (state) => state.auth.isForgetPass;
export const isForgetOtpConfirmedSelector = (state) =>
  state.auth.isForgetOtpConfirmed;
export const usernameSelector = (state) => state.auth.username;
export const isLoginSuccesfulSelector = (state) => state.auth.isLoginSuccesful;
