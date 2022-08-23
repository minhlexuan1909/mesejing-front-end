import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  acceptFriendThunk,
  getListFriendedThunk,
  getListRequestInQueueThunk,
  rejectFriendThunk,
  requestFriendThunk,
  unfriendThunk,
  getListFriendsJoinRoomThunk,
} from "./friendThunk";

const friendSlice = createSlice({
  name: "friend",
  initialState: {
    listFriended: [
      // {
      //   firstName: "duy",
      //   lastName: "dung1",
      //   avatar: "...jpg",
      //   userId: "123123132",
      // },
    ],
    isFriendProfileVisible: false,
    listFriendInqueues: [],
    listFriendsJoinRoom: [],

    // Loading state
    isGettingFriend: false,
  },
  reducers: {
    setIsFriendProfileVisible: (state, action) => {
      state.isFriendProfileVisible = action.payload;
    },
    addUserToListFriendInQueue: (state, action) => {
      state.listFriendInqueues.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListFriendedThunk.pending, (state, aciton) => {
        state.isGettingFriend = true;
      })
      .addCase(getListFriendedThunk.fulfilled, (state, action) => {
        state.isGettingFriend = false;
        state.listFriended = action.payload.data.friendeds;
      })
      .addCase(getListFriendedThunk.rejected, (state, aciton) => {
        state.isGettingFriend = false;
      });
    builder
      .addCase(requestFriendThunk.pending, (state, action) => {})
      .addCase(requestFriendThunk.fulfilled, (state, action) => {
        toast.success("Send request succesfully");
      })
      .addCase(requestFriendThunk.rejected, (state, action) => {});
    builder
      .addCase(acceptFriendThunk.pending, (state, action) => {})
      .addCase(acceptFriendThunk.fulfilled, (state, action) => {
        toast.success("Friend Added");
        const acceptedId = action.meta.arg.friendId;
        state.listFriended.push(
          state.listFriendInqueues.find((user) => user._id === acceptedId)
        );
        state.listFriendInqueues = state.listFriendInqueues.filter(
          (user) => user._id !== acceptedId
        );
      })
      .addCase(acceptFriendThunk.rejected, (state, action) => {});
    builder
      .addCase(rejectFriendThunk.pending, (state, action) => {})
      .addCase(rejectFriendThunk.fulfilled, (state, action) => {
        toast.success("Friend Rejected");
        const rejectedId = action.meta.arg.friendId;
        state.listFriendInqueues = state.listFriendInqueues.filter(
          (user) => user._id !== rejectedId
        );
      })
      .addCase(rejectFriendThunk.rejected, (state, action) => {});
    builder
      .addCase(unfriendThunk.pending, (state, action) => {})
      .addCase(unfriendThunk.fulfilled, (state, action) => {
        toast.success("Friend Removed");
        state.listFriended = state.listFriended.filter(
          (friend) => friend._id !== action.meta.arg.friendId
        );
      })
      .addCase(unfriendThunk.rejected, (state, action) => {});
    builder
      .addCase(getListRequestInQueueThunk.pending, (state, action) => {})
      .addCase(getListRequestInQueueThunk.fulfilled, (state, action) => {
        state.listFriendInqueues = action.payload.data.friendsInQueue;
      })
      .addCase(getListRequestInQueueThunk.rejected, (state, action) => {});
    builder
      .addCase(getListFriendsJoinRoomThunk.pending, (state, action) => {})
      .addCase(getListFriendsJoinRoomThunk.fulfilled, (state, action) => {
        state.listFriendsJoinRoom = action.payload.data.friends;
      })
      .addCase(getListFriendsJoinRoomThunk.rejected, (state, action) => {});
  },
});

export default friendSlice;

export const friendAction = friendSlice.actions;

export const listFriendedSelector = (state) => state.friend.listFriended;
export const isFriendProfileVisibleSelector = (state) =>
  state.friend.isFriendProfileVisible;
export const listFriendInqueuesSelector = (state) =>
  state.friend.listFriendInqueues;
export const listFriendsJoinRoomSelector = (state) =>
  state.friend.listFriendsJoinRoom;
export const isGettingFriendSelector = (state) => state.friend.isGettingFriend;
