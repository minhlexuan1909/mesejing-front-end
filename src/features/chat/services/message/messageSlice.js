import { createSlice } from "@reduxjs/toolkit";
import {
  sendMessageThunk,
  getMessageRoomThunk,
  getMoreMessageRoomThunk,
} from "./messageThunk";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messageList: [],
    loadMoreMessage: [],
    hasMorePage: true,
    // Loading state
    isGettingMessage: false,
    isSendingMessage: false,
  },
  reducers: {
    setMessage: (state, action) => {
      state.messageList = action.payload;
    },
    removeMessage: (state) => {
      state.messageList = [];
    },
    addNewMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageThunk.pending, (state, action) => {
        state.isSendingMessage = true;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isSendingMessage = false;
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.isSendingMessage = false;
      });

    builder
      .addCase(getMessageRoomThunk.pending, (state, action) => {
        state.isGettingMessage = true;
      })
      .addCase(getMessageRoomThunk.fulfilled, (state, action) => {
        // state.messageList = action.payload.data.messages.slice(0).reverse();
        // console.log(state.messageList)
        // state.messageList = [...state.messageList.slice(0), ...action.payload.data.messages.slice(0).reverse()]
        state.isGettingMessage = false;
        // state.messageList.push.apply(
        //   state.messageList,
        //   action.payload.data.messages
        // );
        state.messageList = state.messageList.concat(
          action.payload.data.messages
        );
        if (action.payload.data.pagination.hasOwnProperty("next")) {
          state.hasMorePage = true;
        } else {
          state.hasMorePage = false;
        }
        // console.log(action.payload.data.messages)
      })
      .addCase(getMessageRoomThunk.rejected, (state, action) => {
        state.isGettingMessage = false;
        console.log("UNU can't get");
      });
    builder
      .addCase(getMoreMessageRoomThunk.pending, (state, action) => {})
      .addCase(getMoreMessageRoomThunk.fulfilled, (state, action) => {
        state.loadMoreMessage = action.payload.data.messages.slice(0).reverse();
      })
      .addCase(getMoreMessageRoomThunk.rejected, (state, action) => {
        console.log("UNU can't get");
      });
  },
});

export default messageSlice;

export const messageAction = messageSlice.actions;
export const messageSelector = (state) =>
  state.message.messageList.slice(0).reverse();
export const moreMessageSelector = (state) => state.message.loadMoreMessage;
export const hasMorePageSelector = (state) => state.message.hasMorePage;
// export const messageSelector = (state) => state.room.message;
// export const roomsSelector = (state) => state.room.rooms;
// export const selectedRoomSelector = (state) => state.room.selectedRoom;
export const isGettingMessageSelector = (state) =>
  state.message.isGettingMessage;
export const isSendingMessageSelector = (state) =>
  state.message.isSendingMessage;
