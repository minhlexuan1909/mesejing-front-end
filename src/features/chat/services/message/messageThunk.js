import { createAsyncThunk } from "@reduxjs/toolkit";
import MessageAPI from "../../api/MessageAPI";

export const sendMessageThunk = createAsyncThunk(
  "message/sendMessageThunk",
  async (data, { rejectWithValue }) => {
    const { token, ...apiData } = data;
    try {
      const res = await MessageAPI.sendMessage(apiData, token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getMessageRoomThunk = createAsyncThunk(
  "message/getMessageRoomThunk",
  async (data, { rejectWithValue }) => {
    // const { token, roomID, limit } = data;
    try {
      const res = await MessageAPI.getMessageRoom(data.token, data.roomID, data.page);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getMoreMessageRoomThunk = createAsyncThunk(
  "message/getMoreMessageRoomThunk",
  async (data, { rejectWithValue }) => {
    // const { token, roomID, limit } = data;
    try {
      const res = await MessageAPI.getMessageRoom(data.token, data.roomID, data.page);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
