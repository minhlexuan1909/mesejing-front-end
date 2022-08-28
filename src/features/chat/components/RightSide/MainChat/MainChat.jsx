import "./MainChat.scss";

import {
  faChevronLeft,
  faEllipsis,
  faFaceLaughBeam,
  faFileArrowUp,
  faHeart,
  faPaperPlane,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "antd";
import axios from "axios";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Shimmer from "react-shimmer-effect";

import { mqttPayloadSelector } from "../../../../../services/mqtt/mqttSlice";
import {
  tokenSelector,
  userIdSelector,
} from "../../../../auth/services/authSlice";
import { friendAction } from "../../../../profile/services/friend/friendSlice";
import { userProfileAction } from "../../../../profile/services/userProfile/userProfileSlice";
import {
  hasMorePageSelector,
  isGettingMessageSelector,
  isSendingMessageSelector,
  messageAction,
  messageSelector,
} from "../../../services/message/messageSlice";
import {
  getMessageRoomThunk,
  sendMessageThunk,
} from "../../../services/message/messageThunk";
import {
  roomAction,
  roomDetailSelector,
  selectedRoomSelector,
} from "../../../services/room/roomSlice";
import { getDetailRoomThunk } from "../../../services/room/roomThunk";
import AddFriendToGroup from "../AddFriendToGroup/AddFriendToGroup";
import RoomDetail from "../RoomDetail/RoomDetail";
import SystemMessage from "./SystemMessage/SystemMessage";
import UserMessage from "./UserMessage/UserMessage";
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
  // const [roomID, setRoomID] = useState(null);
  const [inputTextMessage, setInputTextMessage] = useState("");

  const [isShowEmojis, setIsShowEmojis] = useState(false);
  const [imgFile, setImgFile] = useState();

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
          <MainChatHeader />
          <MainChatBody />
        </div>
      </div>
    );
};

export default MainChat;
