import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { requestFriendThunk } from "../friend/friendThunk";
import { searchUserThunk } from "./userSearchThunk";

const userSearchSlice = createSlice({
  name: "userSearch",
  initialState: {
    listUserFound: [],
    isLoadingMoreUserFound: false,
  },
  reducers: {
    removeListUserdFound: (state, action) => {
      state.listUserFound = [];
    },
    changeFriendStatus: (state, action) => {
      const target = state.listUserFound.find(
        (user) => user.id === action.payload
      );
      target.friendStatus = "inqueue";
      target.request = true;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(searchUserThunk.pending, (state, action) => {
        state.isLoadingMoreUserFound = true;
      })
      .addCase(searchUserThunk.fulfilled, (state, action) => {
        state.listUserFound.push.apply(
          state.listUserFound,
          action.payload.data.data
        );
        state.isLoadingMoreUserFound = false;
      })
      .addCase(searchUserThunk.rejected, (state, action) => {
        console.log(action.payload.data.error);
        state.isLoadingMoreUserFound = false;
      });
    buider.addCase(requestFriendThunk.fulfilled, (state, action) => {
      const target = state.listUserFound.find(
        (user) => user.id === action.meta.arg.friendId
      );
      target.friendStatus = "inqueue";
    });
    buider.addCase(requestFriendThunk.rejected, (state, action) => {
      toast.error(action.payload.data.error);
    });
  },
});

export default userSearchSlice;

export const userSearchAction = userSearchSlice.actions;

export const listFriendFoundSelector = (state) =>
  state.userSearch.listUserFound;
export const isLoadingMoreFriendFoundSelector = (state) =>
  state.userSearch.isLoadingMoreUserFound;
