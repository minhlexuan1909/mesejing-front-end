import { Tabs } from "antd";
import React from "react";
import UserWithStatus from "../../../../../components/UserWithStatus";
import MainWrapper from "../MainWrapper/MainWrapper";
import "./MainChatList.scss";
import LeftNavItem from "../../../../../components/LeftNavItem/LeftNavItem";
import { useDispatch, useSelector } from "react-redux";
import { roomAction, roomsSelector } from "../../../services/room/roomSlice";

const { TabPane } = Tabs;
const MainChatList = () => {
  const rooms = useSelector(roomsSelector);
  const dispatch = useDispatch();
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
                title={room.name}
                lastMessage={
                  room.hasOwnProperty("lastMessage")
                    ? room.lastMessage.content
                    : ""
                }
                type="room"
                room={room}
                img={`${
                  process.env.REACT_APP_BASE_IMAGE_URL
                }${room.avatarGroup.replaceAll(" ", "-")}`}
              />
            ))}

            {/* <div className="group-chat new-message">
              <UserWithStatus size="50px" img="avatar.jpg" />
              <div className="main-content">
                <div className="title">Minh Xuân Lê</div>
                <div className="last-message">Hellooooooooooooooo</div>
              </div>
            </div> */}
          </TabPane>
          {/* <TabPane tab="Chưa đọc" key="2">
            Content of Tab Pane 2
          </TabPane> */}
        </Tabs>
      </MainWrapper>
    </div>
  );
};

export default MainChatList;
