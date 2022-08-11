import { createAsyncThunk } from "@reduxjs/toolkit";
import RoomAPI from "../../api/RoomAPI";

export const sendMessageThunk = createAsyncThunk(
  "room/sendMessageThunk",
  async (data, { rejectWithValue }) => {
    const { ...apiData } = data;
    try {
      const res = await RoomAPI.sendMessage(apiData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const createRoomThunk = createAsyncThunk(
  "room/createRoomThunk",
  async (data, { rejectWithValue }) => {
    const { token, ...apiData } = data;
    try {
      const res = await RoomAPI.createRoom(apiData, token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getRoomsThunk = createAsyncThunk(
  "room/getRooms",
  async (data, { rejectWithValue }) => {
    try {
      const res = await RoomAPI.getRooms(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getDetailRoomThunk = createAsyncThunk(
  "room/getDetailRoomThunk",
  async (data, { rejectWithValue }) => {
    const { roomID, token } = data;
    try {
      const res = await RoomAPI.getRoom(roomID, token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getUsersInRoomThunk = createAsyncThunk(
  "room/getUsersInRoomThunk",
  async (data, { rejectWithValue }) => {
    const { roomID, token } = data;
    try {
      const res = await RoomAPI.getUsersInRoom(roomID, token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const setNameOfRoomThunk = createAsyncThunk(
  "room/setNameOfRoomThunk",
  async (data, { rejectWithValue }) => {
    // const { roomID, name , token} = data
    try {
      const res = await RoomAPI.setNameOfRoom(
        data.roomID,
        data.name,
        data.token
      );
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const deleteUserInRoomThunk = createAsyncThunk(
  "room/deleteUserInRoomThunk",
  async (data, { rejectWithValue }) => {
    // const { roomID, userID , token} = data
    try {
      const res = await RoomAPI.deleteUser(
        data.roomID,
        data.deleteUserID,
        data.token
      );
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const leaveRoomThunk = createAsyncThunk(
  "room/leaveRoomThunk",
  async (data, { rejectWithValue }) => {
    // const { roomID, userID , token} = data
    try {
      const res = await RoomAPI.leaveRoom(data.roomID, data.token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const setAvatarOfRoomThunk = createAsyncThunk(
  "room/setAvatarOfRoomThunk",
  async (data, { rejectWithValue }) => {
    // const { roomID, name , token} = data
    try {
      const res = await RoomAPI.setAvatarOfRoom(data.roomID, data.avatar, data.token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const updateLastSeenMessageThunk = createAsyncThunk(
  "room/updateLastSeen",
  async (data, { rejectWithValue }) => {
    try {
      const res = await RoomAPI.updateLastSeenMessage(data.roomID, data.token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const addUsersThunk = createAsyncThunk(
  "room/addUsersThunk",
  async (data, { rejectWithValue }) => {
    const {roomID , token, ...apiData} = data
    try {
      const res = await RoomAPI.addUsers(roomID, token, apiData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
