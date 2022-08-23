import { createSlice } from "@reduxjs/toolkit";
import { getUserByIdThunk } from "./userProfileThunk";

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    selectedUserProfile: null,
    firstNameProfile: null,
    lastNameProfile: null,
    dateOfBirthProfile: "01-01-1980",
    isShowOwnProfile: false,
    emailProfile: "default@gmail.com",
    avatarProfile: "default",
    coverProfile: "default",
    // Loading state
    isGettingUserProfile: false,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUserProfile = action.payload;
    },
    setIsShowOwnProfile: (state, action) => {
      state.isShowOwnProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByIdThunk.pending, (state, action) => {
        state.isGettingUserProfile = true;
      })
      .addCase(getUserByIdThunk.fulfilled, (state, action) => {
        state.isGettingUserProfile = false;
        // state.username = action.payload.data.user.username;
        state.firstNameProfile = action.payload.data.user.firstName;
        state.lastNameProfile = action.payload.data.user.lastName;
        state.avatarProfile = action.payload.data.user.avatar;
        state.emailProfile = action.payload.data.user.email;
        state.dateOfBirthProfile = action.payload.data.user.dob;
        state.coverProfile = action.payload.data.user.cover;
      })
      .addCase(getUserByIdThunk.rejected, (state, action) => {
        state.isGettingUserProfile = false;
      });
  },
});

export default userProfileSlice;
export const userProfileAction = userProfileSlice.actions;

export const selectedUserProfileSelector = (state) =>
  state.userProfile.selectedUserProfile;
export const firstNameProfileSelector = (state) =>
  state.userProfile.firstNameProfile;
export const lastNameProfileSelector = (state) =>
  state.userProfile.lastNameProfile;
export const isShowOwnProfileSelector = (state) =>
  state.userProfile.isShowOwnProfile;
export const emailProfileSelector = (state) => state.userProfile.emailProfile;
export const dateOfBirthProfileSelector = (state) =>
  state.userProfile.dateOfBirthProfile;
export const avatarProfileSelector = (state) => state.userProfile.avatarProfile;
export const coverProfileSelector = (state) => state.userProfile.coverProfile;
export const isGettingUserProfileSelector = (state) =>
  state.userProfile.isGettingUserProfile;
