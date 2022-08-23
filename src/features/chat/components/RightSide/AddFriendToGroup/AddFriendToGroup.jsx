import { DownOutlined } from "@ant-design/icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Dropdown,
  Menu,
  Row,
  Transfer,
  Space,
  Modal,
  Button,
  Input,
  Form,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  tokenSelector,
  userIdSelector,
  usernameSelector,
} from "../../../../auth/services/authSlice";
import { listFriendsJoinRoomSelector } from "../../../../profile/services/friend/friendSlice";
import {
  createRoomThunk,
  addUsersThunk,
} from "../../../services/room/roomThunk";
import LeftNavItem from "../../../../../components/LeftNavItem/LeftNavItem";
import { getListFriendsJoinRoomThunk } from "../../../../profile/services/friend/friendThunk";
import { selectedRoomSelector } from "../../../services/room/roomSlice";

const AddFriendToGroup = ({ isAddToGroupVisible, setIsAddToGroupVisible }) => {
  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);
  const username = useSelector(usernameSelector);
  const id = useSelector(userIdSelector);
  const roomID = useSelector(selectedRoomSelector);

  const [listSelectedFriend, setListSelectedFriend] = useState([]);
  const listFriendInit = useSelector(listFriendsJoinRoomSelector);
  const [listFriend, setListFriend] = useState([]);
  const [listAddToGroup, setListAddToGroup] = useState([]);

  // Add key to friend list to work with antd
  const resetListFriend = () => {
    const tmpList = [];
    listFriendInit.forEach((item, index) => {
      if (item.inRoom === false) {
        tmpList.push({ ...item, key: index.toString() });
      }
    });
    setListFriend(tmpList);
  };

  // Handle select all friend to add to group
  const onClickSelectAll = () => {
    setListSelectedFriend(listFriendInit.map((item) => item.key));
  };

  // Upload image to server to get image name

  // Create group
  const onFinishCreateGroup = async (values) => {
    let participants = [];
    listAddToGroup.forEach((item) => {
      let index = parseInt(item);
      let data = {
        userId: listFriendInit[index]._id,
        firstName: listFriendInit[index].firstName,
        lastName: listFriendInit[index].lastName,
      };
      participants.push(data);
    });
    // let data = {
    //   roomID: roomID,
    //   token:
    // }
    dispatch(addUsersThunk({ roomID, token, participants }));

    // console.log(listFriendInit);
    // console.log(listFriend);
    // console.log(listAddToGroup);
    resetListFriend();
    setListSelectedFriend([]);
    setListAddToGroup([]);
    setIsAddToGroupVisible(false);
  };

  const onChangeAddToGroup = (targetKeys) => {
    setListAddToGroup(targetKeys);
    setListSelectedFriend([]);
  };

  useEffect(() => {
    // const mockData = [];
    // for (let i = 0; i < 20; i++) {
    //   const data = {
    //     // Must have key
    //     key: i.toString(),
    //     title: `content${i + 1}`,
    //     description: `description of content${i + 1}`,
    //   };
    //   mockData.push(data);
    // }
    dispatch(getListFriendsJoinRoomThunk({ roomID, token }));
    resetListFriend();
  }, []);

  // console.log(listFriendInit);

  // console.log(listFriend);

  return (
    <Modal
      visible={isAddToGroupVisible}
      footer={null}
      centered
      onCancel={() => {
        setIsAddToGroupVisible(false);
        setListSelectedFriend([]);
      }}
      title="Thêm bạn vào cuộc trò chuyện"
      width="700px"
    >
      <Form onFinish={onFinishCreateGroup}>
        <Form.Item>
          <Transfer
            dataSource={listFriend}
            selectedKeys={listSelectedFriend}
            showSearch
            oneWay
            targetKeys={listAddToGroup}
            onChange={onChangeAddToGroup}
            onSelectChange={(targetSelectedKeys) => {
              // console.log(targetSelectedKeys);
              setListSelectedFriend(targetSelectedKeys);
            }}
            onSearch={(dir, value) => {
              // console.log(dir, value);
            }}
            listStyle={{ width: "45%", height: "300px" }}
            titles={["Friend list", "Selected People"]}
            render={(friend) => {
              const customLabel = (
                <LeftNavItem
                  img={`${
                    process.env.REACT_APP_BASE_IMAGE_URL
                  }${friend.avatar.replaceAll(" ", "-")}`}
                  type="add-to-group-list"
                  title={friend.lastName + " " + friend.firstName}
                  size="20px"
                />
              );
              return {
                label: customLabel, // for displayed item
                value: friend.lastName + " " + friend.firstName, // for title and filter matching
              };
            }}
          />
        </Form.Item>
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                setIsAddToGroupVisible(false);
              }}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "8px" }}
            >
              Thêm vào nhóm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFriendToGroup;
