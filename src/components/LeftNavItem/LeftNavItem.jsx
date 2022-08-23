import "./LeftNavItem.scss";

import React, { useState } from "react";

import UserWithStatus from "../UserWithStatus";
import { Button, Dropdown, Menu, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { unfriendThunk } from "../../features/profile/services/friend/friendThunk";
import { tokenSelector } from "../../features/auth/services/authSlice";
import { friendAction } from "../../features/profile/services/friend/friendSlice";
import { userProfileAction } from "../../features/profile/services/userProfile/userProfileSlice";
import { roomAction } from "../../features/chat/services/room/roomSlice";
import { updateLastSeenMessageThunk } from "../../features/chat/services/room/roomThunk";
import Shimmer from "react-shimmer-effect";
const LeftNavItem = ({
  isLoading = false,
  title,
  lastMessage,
  img,
  rightSide,
  type = null,
  border = true,
  onClick = null,
  size = "50px",
  friend,
  room,
}) => {
  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);

  const [isRemoveFriendVisible, setIsRemoveFriendVisible] = useState(false);
  const handleConfirmRemoveFriend = () => {
    dispatch(unfriendThunk({ friendId: friend._id, token }));
    setIsRemoveFriendVisible(false);
  };
  const modalRemoveFriend = (
    <Modal
      visible={isRemoveFriendVisible}
      centered
      onCancel={() => setIsRemoveFriendVisible(false)}
      title="Xác nhận"
      bodyStyle={{ fontSize: "15px" }}
      okText="Xác nhận"
      cancelText="Hủy"
      onOk={handleConfirmRemoveFriend}
    >
      Bạn muốn xóa Anna ra khỏi danh sách bạn bè?
    </Modal>
  );
  const menuFriend = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          dispatch(friendAction.setIsFriendProfileVisible(true));
          dispatch(userProfileAction.setSelectedUser(friend._id));
        }}
      >
        View Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={() => setIsRemoveFriendVisible(true)}>
        Unfriend
      </Menu.Item>
    </Menu>
  );

  if (type === "friend") {
    rightSide = (
      <>
        <Dropdown trigger={["click"]} overlay={menuFriend}>
          <Button
            shape="circle"
            icon={<FontAwesomeIcon icon={faEllipsis} />}
          ></Button>
        </Dropdown>
        {modalRemoveFriend}
      </>
    );
  }

  const handleItemOnClick = () => {
    if (type === "friend" || type === "room") {
      if (room) {
        dispatch(
          updateLastSeenMessageThunk({ roomID: room._id, token: token })
        );
      }
    }
    if (type === "friend") {
      dispatch(
        roomAction.setSelectedRoomAtFriendList({
          name: friend.firstName + " " + friend.lastName,
        })
      );
    } else if (type === "room") {
      dispatch(roomAction.setSelectedRoom(room._id));
    }
  };
  return (
    <div onClick={onClick}>
      <div
        className="group-chat"
        style={border ? { border: "1px solid #e1e4ea" } : {}}
        onClick={handleItemOnClick}
      >
        {isLoading ? (
          <Shimmer>
            <div
              style={{ width: size, height: size, borderRadius: "50%" }}
            ></div>
          </Shimmer>
        ) : (
          <UserWithStatus size={size} img={img} />
        )}
        <div className="main-content">
          {isLoading ? (
            <Shimmer>
              <div style={{ height: "10px", marginBottom: "7px" }}></div>
              <div style={{ height: "10px", width: "50px" }}></div>
            </Shimmer>
          ) : (
            <div
              className={`title ${
                room &&
                room.hasOwnProperty("lastMessage") &&
                room.lastMessage.isSeen === false
                  ? "unseen-last-message"
                  : ""
              }`}
            >
              {title}
            </div>
          )}
          <div className="last-message">{lastMessage}</div>
        </div>
        <div className="right-side">{rightSide}</div>
      </div>
    </div>
  );
};

export default LeftNavItem;
