import "./LeftNav.scss";

import {
  faAddressBook,
  faArrowRightFromBracket,
  faBell,
  faCheck,
  faCircleInfo,
  faCommentDots,
  faEarthAsia,
  faGear,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Dropdown, Menu, Modal, Tabs } from "antd";
import React, { forwardRef, useState } from "react";

import UserWithStatus from "../../../../../components/UserWithStatus";
import MainChatList from "../MainChatList/MainChatList";
import OnlineList from "../OnlineList/OnlineList";
import { useDispatch, useSelector } from "react-redux";
import {
  authAction,
  userIdSelector,
} from "../../../../auth/services/authSlice";
import FriendList from "../../../../profile/components/FriendList/FriendList";
import ListAddFriend from "../../RightSide/ListAddFriend/ListAddFriend";
import Opening from "../../RightSide/Opening/Opening";
import {
  roomAction,
  selectedRoomAtFriendListSelector,
  selectedRoomSelector,
} from "../../../services/room/roomSlice";
import MainChat from "../../RightSide/MainChat/MainChat";
import ModalMyProfile from "../../../../profile/components/ModalMyProfile/ModalMyProfile";
import { avatarProfileSelector } from "../../../../profile/services/selfProfile/selfProfileSlice";
import { selfProfileAction } from "../../../../profile/services/selfProfile/selfProfileSlice";

const { TabPane } = Tabs;
const { SubMenu } = Menu;
const LeftNav = (props, ref) => {
  const dispatch = useDispatch();

  const selectedRoom = useSelector(selectedRoomSelector);
  const userId = useSelector(userIdSelector);
  const avatarProfile = useSelector(avatarProfileSelector);
  const selectedRoomAtFriendList = useSelector(
    selectedRoomAtFriendListSelector
  );

  const [isNewFriendRequest, setIsNewFriendRequest] = useState(true);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("2");

  const handleLogoutClick = () => {
    dispatch(authAction.removeUser());
    dispatch(authAction.removeLocalToken());
    dispatch(roomAction.removeAllRooms());
    dispatch(roomAction.resetRoom());
    dispatch(roomAction.setSelectedRoom(null));
  };
  const aboutModal = (
    <Modal
      visible={isAboutVisible}
      footer={null}
      centered
      closable={false}
      onCancel={() => setIsAboutVisible(false)}
      bodyStyle={{ padding: 0 }}
    >
      <div className="about-modal">
        <div className="upper">
          <FontAwesomeIcon icon={faCommentDots} className="icon" />
          <div className="text">Mesejing</div>
        </div>
        <div className="lower">
          <div className="text">
            Made with love by members of ProPTIT{" "}
            <img src="./assets/images/ProPTIT.png" alt="ProPTIT-logo"></img>
          </div>
        </div>
      </div>
    </Modal>
  );
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<FontAwesomeIcon icon={faCircleInfo} />}
        onClick={() => {
          setIsAboutVisible(true);
        }}
      >
        Thông tin
      </Menu.Item>
      <Menu.Item
        disabled={true}
        key="2"
        icon={<FontAwesomeIcon icon={faMobileScreen} />}
      >
        Mesejing Mobile
      </Menu.Item>
      {/* <Menu.Divider />
      <SubMenu
        icon={<FontAwesomeIcon icon={faBell} />}
        title="Cài đặt thông báo"
      >
        <Menu.Item>
          Bật thông báo{" "}
          {noti && (
            <FontAwesomeIcon icon={faCheck} style={{ marginLeft: "5px" }} />
          )}
        </Menu.Item>
        <Menu.Item>
          Tắt thông báo{" "}
          {noti || (
            <FontAwesomeIcon icon={faCheck} style={{ marginLeft: "5px" }} />
          )}
        </Menu.Item>
      </SubMenu> */}
      <Menu.Divider />
      <Menu.Item
        key="4"
        icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
        onClick={handleLogoutClick}
      >
        Log out
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="left-nav" ref={ref}>
      <ModalMyProfile />
      <Tabs
        destroyInactiveTabPanes={true}
        defaultActiveKey={"2"}
        tabPosition="left"
        tabBarStyle={{ backgroundColor: "#2f80ed", height: "100vh" }}
        onChange={(activeKey) => {
          setActiveKey(activeKey);
        }}
      >
        <TabPane
          tab={
            <UserWithStatus
              size={"50px"}
              img={`${
                process.env.REACT_APP_BASE_IMAGE_URL
              }${avatarProfile.replaceAll(" ", "-")}`}
              onClick={() => {
                dispatch(selfProfileAction.setIsShowOwnProfile(true));
              }}
            />
          }
          key="1"
          disabled={true}
        ></TabPane>
        <TabPane
          tab={<FontAwesomeIcon icon={faCommentDots} className="nav-icon" />}
          key="2"
        >
          <div style={{ width: "100%", display: "flex" }}>
            <Col lg={6} md={8} sm={24} xs={24}>
              <MainChatList />
            </Col>
            <Col lg={18} md={16} sm={0} xs={0}>
              {selectedRoom && activeKey === "2" ? <MainChat /> : <Opening />}
            </Col>
          </div>
        </TabPane>
        {/* <TabPane
          tab={<FontAwesomeIcon icon={faEarthAsia} className="nav-icon" />}
          key="3"
        >
          <Col lg={6} md={8} sm={24} xs={24}>
            <OnlineList />
          </Col>
          <Col lg={18} md={16} sm={0} xs={0}></Col>
        </TabPane> */}
        <TabPane
          tab={
            <div>
              <FontAwesomeIcon
                style={{ position: "relative" }}
                icon={faAddressBook}
                className="nav-icon"
              />
            </div>
          }
          key="4"
        >
          <div style={{ width: "100%", display: "flex" }}>
            <Col lg={6} md={8} sm={24} xs={24}>
              <FriendList />
            </Col>
            <Col lg={18} md={16} sm={0} xs={0}>
              {selectedRoom && activeKey === "4" ? (
                <MainChat />
              ) : (
                <ListAddFriend />
              )}
            </Col>
          </div>
        </TabPane>
        <TabPane
          tab={
            <Dropdown overlay={menu} placement="topLeft">
              <FontAwesomeIcon icon={faGear} className="nav-icon gear-icon" />
            </Dropdown>
          }
          key="5"
          style={{ backgroundColor: "red" }}
          disabled={true}
        ></TabPane>
      </Tabs>
      {aboutModal}
    </div>
  );
};

export default forwardRef(LeftNav);
