import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "../features/chat/services/room/roomSlice";
import authSlice from "../features/auth/services/authSlice";
import friendSlice from "../features/profile/services/friend/friendSlice";
import mqttSlice from "../services/mqtt/mqttSlice";
import userSearchSlice from "../features/profile/services/userSearch/userSearchSlice";
import userProfileSlice from "../features/profile/services/userProfile/userProfileSlice";
import messageSlice from "../features/chat/services/message/messageSlice";
import selfProfileSlice from "../features/profile/services/selfProfile/selfProfileSlice";

const store = configureStore({
  reducer: {
    mqtt: mqttSlice.reducer,
    room: roomSlice.reducer,
    auth: authSlice.reducer,
    friend: friendSlice.reducer,
    userSearch: userSearchSlice.reducer,
    selfProfile: selfProfileSlice.reducer,
    userProfile: userProfileSlice.reducer,
    message: messageSlice.reducer,
  },
});

export default store;
