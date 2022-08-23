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
import { faL } from "@fortawesome/free-solid-svg-icons";

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
    // Loading state
    isLoginSuccesful: false,
    isCheckingLogin: false,
    isResetPassword: false,
    isConfirmOtp: false,
    isChangingPassword: false,
    isRegister: false,
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
        state.isCheckingLogin = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.data.token;
        state.isEmailConfirmed = true;
        state.isLoginSuccesful = true;
        state.isCheckingLogin = false;
        localStorage.setItem("token", action.payload.data.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        // console.log(action.payload.data.error);
        // if (action.payload.data.hasOwnProperty("isEmailConfirmed")) {
        //   state.isEmailConfirmed = action.payload.data.isEmailConfirmed;
        // }
        state.isEmailConfirmed = action.payload.data.isEmailConfirmed;
        toast.error(action.payload.data.error);
        state.isCheckingLogin = false;
      });

    builder
      .addCase(registerThunk.pending, (state, action) => {
        state.isRegister = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isRegister = false;
        state.emailOrUsername = action.meta.arg.username;
        state.isEmailConfirmed = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isRegister = false;
        toast.error(action.payload.data.error);
      });

    builder
      .addCase(confirmEmailThunk.pending, (state, action) => {
        state.isConfirmOtp = true;
      })
      .addCase(confirmEmailThunk.fulfilled, (state, action) => {
        state.isEmailConfirmed = true;
        state.isConfirmOtp = false;
        state.token = action.payload.data.token;
        toast.success("Confirm email successfully ");
      })
      .addCase(confirmEmailThunk.rejected, (state, action) => {
        state.isConfirmOtp = false;
        toast.error(action.payload.data.error);
      });

    builder
      .addCase(forgotPasswordThunk.pending, (state, action) => {
        state.emailOrUsername = action.meta.arg.emailOrUsername;
        state.isResetPassword = true;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.isForgetPass = true;
        state.isResetPassword = false;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        toast.error(action.payload.data.error);
        state.isResetPassword = false;
      });

    builder
      .addCase(confirmEmailPasswordThunk.pending, (state, action) => {
        state.isConfirmOtp = true;
      })
      .addCase(confirmEmailPasswordThunk.fulfilled, (state, action) => {
        state.isForgetOtpConfirmed = true;
        state.isConfirmOtp = false;
      })
      .addCase(confirmEmailPasswordThunk.rejected, (state, action) => {
        state.isConfirmOtp = false;
        toast.error(action.payload.data.error);
      });

    builder
      .addCase(resetPassword.pending, (state, action) => {
        state.isChangingPassword = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isForgetPass = null;
        state.isForgetOtpConfirmed = null;
        state.isChangingPassword = false;
        toast.success("Change password successfully");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isChangingPassword = false;
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
export const isCheckingLoginSelector = (state) => state.auth.isCheckingLogin;
export const isResetPasswordSelector = (state) => state.auth.isResetPassword;
export const isConfirmOtpSelector = (state) => state.auth.isConfirmOtp;
export const isChangingPasswordSelector = (state) =>
  state.auth.isChangingPassword;
export const isRegisterSelector = (state) => state.auth.isRegister;
