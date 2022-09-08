import "./MainChat.scss";

import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  tokenSelector,
  userIdSelector,
} from "../../../../auth/services/authSlice";
import { messageAction } from "../../../services/message/messageSlice";
import { getMessageRoomThunk } from "../../../services/message/messageThunk";
import { selectedRoomSelector } from "../../../services/room/roomSlice";
import { getDetailRoomThunk } from "../../../services/room/roomThunk";
import RoomDetail from "../RoomDetail/RoomDetail";
import MainChatBody from "./MainChatBody/MainChatBody";
import MainChatHeader from "./MainChatHeader/MainChatHeader";

const MainChat = () => {
  const dispatch = useDispatch();

  // SELECTOR
  const token = useSelector(tokenSelector);
  const userID = useSelector(userIdSelector);
  const roomID = useSelector(selectedRoomSelector);

  const selectedRoom = useSelector(selectedRoomSelector);

  // STATE
  const [isShowDetail, setIsShowDetail] = useState(false);

  //CONST
  const dataSendMessage = {
    roomId: roomID,
    ownerId: userID,
    content: "",
    contentType: "message",
  };
  // REF

  // Get message when room ID was changed
  useEffect(() => {
    dispatch(messageAction.removeMessage());
    dispatch(
      getMessageRoomThunk({
        token: token,
        roomID: dataSendMessage.roomId,
        // Set page is async func => May not take effect right away => Put 1 here
        page: 1,
      })
    );
    dispatch(getDetailRoomThunk({ roomID: roomID, token }));
  }, [roomID, dispatch, token]);

  if (roomID)
    return (
      <div className={`mainChat__container`}>
        <div className="mainChat__wrapper">
          <MainChatHeader setIsShowDetail={setIsShowDetail} />
          <MainChatBody isShowDetail={isShowDetail} />
        </div>
        {isShowDetail && <RoomDetail />}
      </div>
    );
};

export default MainChat;
