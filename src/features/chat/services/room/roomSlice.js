import { createSlice } from "@reduxjs/toolkit";
import Item from "antd/lib/list/Item";
import {
  createRoomThunk,
  getRoomsThunk,
  getUsersInRoomThunk,
  getDetailRoomThunk,
  setNameOfRoomThunk,
  deleteUserInRoomThunk,
  leaveRoomThunk,
  addUsersThunk,
  updateLastSeenMessageThunk,
} from "./roomThunk";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [
      // id: 1,
      // users: [],
      // name: "",
      // description: "",
      // avatarGroup: "",
      // isGroup: false,
      // type: "group/p2p",
      // slug: ""
    ],
    selectedRoom: null,
    listUsersInRoom: [],
    roomDetail: null,
    selectedRoomAtFriendList: null,
  },
  reducers: {
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    pushRoomToTop: (state, action) => {
      const roomId = action.payload;
      const targetedRoom = state.rooms.find((room) => room._id === roomId);
      state.rooms = state.rooms.filter((room) => room._id !== roomId);
      state.rooms.unshift(targetedRoom);
    },
    addRoom: (state, action) => {
      state.rooms.unshift(action.payload);
    },
    setSelectedRoomAtFriendList: (state, action) => {
      const name = action.payload.name;
      if (!name) {
        state.selectedRoom = null;
      } else {
        const room = state.rooms.find(
          (room) => room.isGroup === false && room.name === name
        );
        state.selectedRoom = room._id;
      }
    },
    setListUserDeleting: (state, action) => {},
    removeAllRooms: (state, action) => {
      state.rooms = [];
    },
    changeLastMessage: (state, action) => {
      const roomID = action.payload.roomID;
      const lastMessage = action.payload.lastMessage;
      const isSeen = action.payload.isSeen;
      const room = state.rooms.find((room) => room._id === roomID);
      if (room && room.hasOwnProperty("lastMessage")) {
        room.lastMessage.content = lastMessage;
        room.lastMessage.isSeen = isSeen;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomsThunk.pending, (state, action) => {})
      .addCase(getRoomsThunk.fulfilled, (state, action) => {
        state.rooms = action.payload.data.rooms;
        state.lastMessage = "123";
      })
      .addCase(getRoomsThunk.rejected, (state, action) => {});

    builder.addCase(createRoomThunk.fulfilled, (state, action) => {
      // state.rooms.unshift({ name: action.meta.arg.name });
    });

    builder
      .addCase(getUsersInRoomThunk.pending, (state, action) => {})
      .addCase(getUsersInRoomThunk.fulfilled, (state, action) => {
        state.listUsersInRoom = action.payload.data.users;
      })
      .addCase(getUsersInRoomThunk.rejected, (state, action) => {});

    builder
      .addCase(getDetailRoomThunk.pending, (state, action) => {})
      .addCase(getDetailRoomThunk.fulfilled, (state, action) => {
        state.roomDetail = action.payload.data.room;
      })
      .addCase(getDetailRoomThunk.rejected, (state, action) => {});

    builder
      .addCase(setNameOfRoomThunk.pending, (state, action) => {})
      .addCase(setNameOfRoomThunk.fulfilled, (state, action) => {
        state.roomDetail.name = action.meta.arg.name;
      })
      .addCase(setNameOfRoomThunk.rejected, (state, action) => {});

    builder
      .addCase(deleteUserInRoomThunk.pending, (state, action) => {})
      .addCase(deleteUserInRoomThunk.fulfilled, (state, action) => {
        const room = state.rooms.find(
          (room) => room._id === state.selectedRoom
        );
        room = room.filter((user) => user._id !== action.meta.arg.deleteUserID);
      })
      .addCase(deleteUserInRoomThunk.rejected, (state, action) => {
        console.log(action);
      });
    builder
      .addCase(leaveRoomThunk.pending, (state, action) => {})
      .addCase(leaveRoomThunk.fulfilled, (state, action) => {
      })
      .addCase(leaveRoomThunk.rejected, (state, action) => {});
    builder
      .addCase(addUsersThunk.pending, (state, action) => {})
      .addCase(addUsersThunk.fulfilled, (state, action) => {
      })
      .addCase(addUsersThunk.rejected, (state, action) => {});
    builder.addCase(updateLastSeenMessageThunk.fulfilled, (state, action) => {
      const room = state.rooms.find(
        (room) => room._id === action.meta.arg.roomID
      );
      if (room && room.hasOwnProperty("lastMessage")) {
        room.lastMessage.isSeen = true;
      }
    });
  },
});

export default roomSlice;

export const roomAction = roomSlice.actions;

// export const messageSelector = (state) => state.room.message;
export const roomsSelector = (state) => state.room.rooms;
export const selectedRoomSelector = (state) => state.room.selectedRoom;
export const usersInRommSelector = (state) => state.room.listUsersInRoom;
export const roomDetailSelector = (state) => state.room.roomDetail;
export const selectedRoomAtFriendListSelector = (state) =>
  state.room.selectedRoomAtFriendList;
