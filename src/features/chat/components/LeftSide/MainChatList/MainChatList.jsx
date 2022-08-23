import { Tabs } from "antd";
import React from "react";
import UserWithStatus from "../../../../../components/UserWithStatus";
import MainWrapper from "../MainWrapper/MainWrapper";
import "./MainChatList.scss";
import LeftNavItem from "../../../../../components/LeftNavItem/LeftNavItem";
import { useDispatch, useSelector } from "react-redux";
import {
  isGettingRoomSelector,
  roomAction,
  roomsSelector,
} from "../../../services/room/roomSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./MainChatList.scss";

const { TabPane } = Tabs;
const MainChatList = () => {
  const rooms = useSelector(roomsSelector);
  const isGettingRoom = useSelector(isGettingRoomSelector);

  const dispatch = useDispatch();

  if (rooms.length === 5 && !isGettingRoom) {
    return (
      <MainWrapper>
        <div className="main-chat-list__error">
          <FontAwesomeIcon icon={faCircleExclamation} size="3x" />
          <span className="main-chat-list__error-text">
            Loading failed. Please reload this page
          </span>
        </div>
      </MainWrapper>
    );
  }
  return (
    <div className="left-main-chat-list">
      <MainWrapper>
        <Tabs
          defaultActiveKey="1"
          tabBarStyle={{ marginLeft: "15px", marginBottom: "0px" }}
        >
          <TabPane tab="Tất cả" key="1">
            {rooms.map((room, index) => (
              <LeftNavItem
                key={index}
                isLoading={isGettingRoom}
                title={room.name}
                lastMessage={
                  !!room.hasOwnProperty("lastMessage") &&
                  room.lastMessage.content
                }
                type="room"
                room={room}
                img={
                  !!room.avatarGroup &&
                  `${
                    process.env.REACT_APP_BASE_IMAGE_URL
                  }${room.avatarGroup.replaceAll(" ", "-")}`
                }
              />
            ))}
          </TabPane>
        </Tabs>
      </MainWrapper>
    </div>
  );
};

export default MainChatList;
