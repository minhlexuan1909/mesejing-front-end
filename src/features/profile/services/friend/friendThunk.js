import { createAsyncThunk } from "@reduxjs/toolkit";
import FriendAPI from "../../api/friend/FriendAPI";

export const getListFriendedThunk = createAsyncThunk(
  "friend/getListFriended",
  async (data, { rejectWithValue }) => {
    try {
      const res = await FriendAPI.getListFriended(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const requestFriendThunk = createAsyncThunk(
  "friend/requestFriend",
  async (data, { rejectWithValue }) => {
    const { friendId, token } = data;
    try {
      const res = await FriendAPI.requestFriend(token, friendId);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const acceptFriendThunk = createAsyncThunk(
  "friend/acceptFriend",
  async (data, { rejectWithValue }) => {
    const { friendId, token, ...apiData } = data;
    try {
      const res = await FriendAPI.acceptFriend(token, friendId);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const rejectFriendThunk = createAsyncThunk(
  "friend/rejectFriend",
  async (data, { rejectWithValue }) => {
    const { friendId, token, ...apiData } = data;
    try {
      const res = await FriendAPI.rejectFriend(token, friendId);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const unfriendThunk = createAsyncThunk(
  "friend/unfriend",
  async (data, { rejectWithValue }) => {
    const { friendId, token } = data;
    try {
      const res = await FriendAPI.unfriend(token, friendId);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const getListRequestInQueueThunk = createAsyncThunk(
  "friend/getListRequestInQueue",
  async (data, { rejectWithValue }) => {
    try {
      const res = await FriendAPI.getListRequestInQueue(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getListFriendsJoinRoomThunk = createAsyncThunk(
  "friend/getListFriendsJoinRoomThunk",
  async (data, { rejectWithValue }) => {
    const { roomID, token } = data;
    try {
      const res = await FriendAPI.getListFriendsJoinRoom(roomID, token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
