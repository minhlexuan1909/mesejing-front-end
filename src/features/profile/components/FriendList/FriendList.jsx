import { Menu } from "antd";
import React from "react";

import LeftNavItem from "../../../../components/LeftNavItem/LeftNavItem";
import MainWrapper from "../../../chat/components/LeftSide/MainWrapper/MainWrapper";

import { useDispatch, useSelector } from "react-redux";
import {
  isGettingFriendSelector,
  listFriendedSelector,
} from "../../services/friend/friendSlice.js";
import { roomAction } from "../../../chat/services/room/roomSlice";

const { SubMenu } = Menu;

const FriendList = () => {
  return (
    <div>
      <MainWrapper>
        <MainWrapperChild />
      </MainWrapper>
    </div>
  );
};

const MainWrapperChild = ({ set_visible_add }) => {
  const listFriended = useSelector(listFriendedSelector);
  const isGettingFriend = useSelector(isGettingFriendSelector);

  const dispatch = useDispatch();
  return (
    <>
      <LeftNavItem
        title="Danh sách kểt bạn"
        img={"./assets/images/add-friend-icon.jpg"}
        onClick={() => dispatch(roomAction.setSelectedRoom(null))}
      />
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <SubMenu key="sub1" title={`Bạn bè (${listFriended.length})`}>
          {listFriended.map((friend, index) => (
            <LeftNavItem
              key={friend._id}
              isLoading={isGettingFriend}
              title={friend.firstName + " " + friend.lastName}
              img={`${
                friend.avatar && process.env.REACT_APP_BASE_IMAGE_URL
              }${friend.avatar.replaceAll(" ", "-")}`}
              type="friend"
              friend={friend}
            />
          ))}
        </SubMenu>
      </Menu>
    </>
  );
};

export default FriendList;
