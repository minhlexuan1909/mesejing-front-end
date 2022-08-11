import { createSlice } from "@reduxjs/toolkit";
import { getMeThunk, updateMyProfileThunk } from "./selfProfileThunk";

const selfProfileSlice = createSlice({
  name: "selfProfile",
  initialState: {
    firstNameProfile: null,
    lastNameProfile: null,
    dateOfBirthProfile: "01-01-1980",
    isShowOwnProfile: false,
    emailProfile: "default@gmail.com",
    avatarProfile: "default",
    userName: null,
    cover: "default"
  },
  reducers: {
    setIsShowOwnProfile: (state, action) => {
      state.isShowOwnProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.firstNameProfile = action.payload.data.user.firstName;
        state.lastNameProfile = action.payload.data.user.lastName;
        state.avatarProfile = action.payload.data.user.avatar;
        state.emailProfile = action.payload.data.user.email;
        state.dateOfBirthProfile = action.payload.data.user.dob;
        state.userName = action.payload.data.user.username;
        state.cover = action.payload.data.user.cover;
      });

    builder
      .addCase(updateMyProfileThunk.fulfilled, (state, action) => {
        console.log("Update profile successfully")
      })
      .addCase(updateMyProfileThunk.rejected, (state, action) => {
        console.log(action)
      });
  },
});

export default selfProfileSlice;

export const selfProfileAction = selfProfileSlice.actions;

export const firstNameProfileSelector = (state) =>
  state.selfProfile.firstNameProfile;
export const lastNameProfileSelector = (state) =>
  state.selfProfile.lastNameProfile;
export const isShowOwnProfileSelector = (state) =>
  state.selfProfile.isShowOwnProfile;
export const emailProfileSelector = (state) => state.selfProfile.emailProfile;
export const dateOfBirthProfileSelector = (state) =>
  state.selfProfile.dateOfBirthProfile;
export const avatarProfileSelector = (state) => state.selfProfile.avatarProfile;
export const userNameProfileSelector = (state) => state.selfProfile.userName;
export const backGroundImgSelector = (state) => state.selfProfile.cover;