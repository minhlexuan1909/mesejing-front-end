import { createSlice } from "@reduxjs/toolkit";
import { sendMessageThunk, getMessageRoomThunk, getMoreMessageRoomThunk } from "./messageThunk";


const messageSlice = createSlice({
  name: "message",
  initialState: {
    messageList: [],
    loadMoreMessage: [],
    hasMorePage: true
  },
  reducers: {
    setMessage: (state, action) => {
      state.messageList = action.payload;
      console.log(action.payload)
      console.log("Set message succesfully")
    },
    removeMessage: (state) => {
      state.messageList = [];
    },
    addNewMessage: (state, action) => {
      state.messageList.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageThunk.pending, (state, action) => {})
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        console.log("Send message successfully")
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {});

    builder
      .addCase(getMessageRoomThunk.pending, (state, action) => {})
      .addCase(getMessageRoomThunk.fulfilled, (state, action) => {
        // state.messageList = action.payload.data.messages.slice(0).reverse();
        // console.log(state.messageList)
        // state.messageList = [...state.messageList.slice(0), ...action.payload.data.messages.slice(0).reverse()]
        state.messageList.push.apply(
          state.messageList,
          action.payload.data.messages
        );
        if (action.payload.data.pagination.hasOwnProperty('next')) {
          state.hasMorePage = true;
        }
        else {
          state.hasMorePage = false;
        }
        // console.log(action.payload.data.messages)
      })
      .addCase(getMessageRoomThunk.rejected, (state, action) => {
        console.log("UNU can't get")
      });
      builder
      .addCase(getMoreMessageRoomThunk.pending, (state, action) => {})
      .addCase(getMoreMessageRoomThunk.fulfilled, (state, action) => {
        state.loadMoreMessage = action.payload.data.messages.slice(0).reverse();
        console.log(state.loadMoreMessage)
      })
      .addCase(getMoreMessageRoomThunk.rejected, (state, action) => {
        console.log("UNU can't get")
      });
  },
});

export default messageSlice;

export const messageAction = messageSlice.actions;
export const messageSelector = (state) => state.message.messageList.slice(0).reverse();
export const moreMessageSelector = (state) => state.message.loadMoreMessage;
export const hasMorePageSelector = (state) => state.message.hasMorePage;
// export const messageSelector = (state) => state.room.message;
// export const roomsSelector = (state) => state.room.rooms;
// export const selectedRoomSelector = (state) => state.room.selectedRoom;
