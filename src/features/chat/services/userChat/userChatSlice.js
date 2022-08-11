import { createSlice } from "@reduxjs/toolkit";

const userChatSlice = createSlice({
  name: "userChat",
  initialState: {
    room: [],
    firstName: null,
    lastName: null,
    avatar: null,
    status: null, // online, offline, ...
  },
  reducers: {},
  extraReducers: (builder) => {},
});
