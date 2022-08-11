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
import LeftNavItem from "../../../../components/LeftNavItem/LeftNavItem";
import {
  tokenSelector,
  userIdSelector,
  usernameSelector,
} from "../../../auth/services/authSlice";
import { listFriendedSelector } from "../../../profile/services/friend/friendSlice";
import {
  firstNameProfileSelector,
  lastNameProfileSelector,
} from "../../../profile/services/selfProfile/selfProfileSlice";
import { createRoomThunk } from "../../services/room/roomThunk";
import ModalUploadImage from "../ModalUploadImage/ModalUploadImage";

const ModalAddToGroup = ({ isAddToGroupVisible, setIsAddToGroupVisible }) => {
  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);
  const username = useSelector(usernameSelector);
  const firstName = useSelector(firstNameProfileSelector);
  const lastName = useSelector(lastNameProfileSelector);
  const id = useSelector(userIdSelector);

  const [isUploadImage, setIsUploadImage] = useState(false);
  const [listSelectedFriend, setListSelectedFriend] = useState([]);
  const listFriendInit = useSelector(listFriendedSelector);
  const [listFriend, setListFriend] = useState([]);
  const [listAddToGroup, setListAddToGroup] = useState([]);
  const [fmData, setFmData] = useState("default");

  // Add key to friend list to work with antd
  const resetListFriend = () => {
    const tmpList = [];
    listFriendInit.forEach((item, index) => {
      tmpList.push({ ...item, key: index.toString() });
    });
    setListFriend(tmpList);
  };

  // Handle select all friend to add to group
  const onClickSelectAll = () => {
    setListSelectedFriend(listFriendInit.map((item) => item.key));
  };

  // Upload image to server to get image name
  const uploadImage = async () => {
    if (fmData !== "default") {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_IMAGE_URL}upload`,
          fmData,
          config
        );
        console.log("server res: ", res);
        return res.data.filename;
      } catch (err) {
        console.log("Eroor: ", err);
      }
    }
  };

  // Create group
  const onFinishCreateGroup = async (values) => {
    resetListFriend();
    setListSelectedFriend([]);
    const name = values.name || "";
    const description = "";
    const participants = [{ firstName, lastName, userId: id }];

    listAddToGroup.forEach((item) => {
      const obj = listFriendInit[parseInt(item)];
      participants.push({
        userId: obj._id,
        firstName: obj.firstName,
        lastName: obj.lastName,
      });
    });

    setListAddToGroup([]);

    const avatarGroup = await uploadImage();
    console.log("Filename:" + avatarGroup);
    const apiData = {
      name,
      participants,
      description,
      avatarGroup: avatarGroup || "default",
    };
    if (avatarGroup || fmData === "default") {
      dispatch(createRoomThunk({ ...apiData, token }));
    }
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
    resetListFriend();
  }, [listFriendInit]);

  // Left and right dropdown options for friend list and people added list (temporarily disabled)
  const leftLabel = ({ selectedCount, totalCount }) => (
    <Space size={5}>
      <Dropdown
        placement="bottomLeft"
        overlay={
          <Menu>
            <Menu.Item onClick={onClickSelectAll}>Chọn tất cả</Menu.Item>
          </Menu>
        }
      >
        <DownOutlined style={{ fontSize: 11 }} />
      </Dropdown>
      {selectedCount > 0 ? `${selectedCount}/${totalCount}` : totalCount}
    </Space>
  );

  const rightLabel = ({ selectedCount, totalCount }) => (
    <Space size={5}>
      <Dropdown placement="bottomLeft" overlay={<Menu></Menu>}>
        <DownOutlined style={{ fontSize: 11 }} />
      </Dropdown>
      {selectedCount > 0 ? `${selectedCount}/${totalCount}` : totalCount}
    </Space>
  );

  return (
    <Modal
      visible={isAddToGroupVisible}
      footer={null}
      centered
      onCancel={() => {
        setIsAddToGroupVisible(false);
        setListSelectedFriend([]);
      }}
      title="Create group"
      width="700px"
    >
      <Form onFinish={onFinishCreateGroup}>
        <Form.Item name="name">
          <Row>
            <Col span={2}>
              <Button
                shape="circle"
                icon={<FontAwesomeIcon icon={faCamera} />}
                onClick={() => setIsUploadImage(true)}
              />
            </Col>
            <Col span={22}>
              <Form.Item
                style={{ marginBottom: "6px" }}
                rules={[
                  { required: true, message: "This feild must be filled" },
                ]}
              >
                <Input placeholder="Type name of your group here"></Input>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
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
            // selectAllLabels={[leftLabel, rightLabel]}
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
              Tạo nhóm
            </Button>
          </div>
        </Form.Item>
      </Form>
      <ModalUploadImage
        isUploadImage={isUploadImage}
        setIsUploadImage={setIsUploadImage}
        fmData={fmData}
        setFmData={setFmData}
      />
    </Modal>
  );
};

export default ModalAddToGroup;
