import React, { useEffect, useRef, useState } from "react";

import { Button, Form, Input, Modal } from "antd";
import LeftNavItem from "../../../../components/LeftNavItem/LeftNavItem";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoadingMoreFriendFoundSelector,
  listFriendFoundSelector,
  userProfileAction,
  userSearchAction,
} from "../../services/userSearch/userSearchSlice";
import { tokenSelector } from "../../../auth/services/authSlice";
import { searchUserThunk } from "../../services/userSearch/userSearchThunk";
import { Messaging } from "react-cssfx-loading";
import { requestFriendThunk } from "../../services/friend/friendThunk";
const AddFriendBtn = ({
  isFriend,
  isSendRequest,
  setIsConfirmModalVisible,
  firstName,
  lastName,
  id,
  setChosenFirstName,
  setChosenLastName,
  setChosenId,
}) => {
  // console.log(isFriend);
  let status;
  if (isFriend === "stranger") status = "Add friend";
  else if (isFriend === "inqueue") {
    if (isSendRequest === true) {
      status = "Sent";
    } else status = "Waiting for your approval";
  } else if (isFriend === "friend") status = "Friend";
  return (
    <Button
      type={isFriend === "stranger" ? "default" : "primary"}
      ghost={isFriend === "not"}
      onClick={
        isFriend === "stranger"
          ? () => {
              setIsConfirmModalVisible(true);
              setChosenFirstName(firstName);
              setChosenLastName(lastName);
              setChosenId(id);
            }
          : () => {}
      }
    >
      {status}
    </Button>
  );
};

const ModalConfirm = ({
  isConfirmModalVisible,
  setIsConfirmModalVisible,
  id,
  name,
}) => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const handleConfirmAddFriend = () => {
    dispatch(requestFriendThunk({ token, friendId: id }));
    setIsConfirmModalVisible(false);
  };

  return (
    <Modal
      visible={isConfirmModalVisible}
      // footer={[
      //   <Button
      //     type="primary"
      //     form="add-friend-form"
      //     htmlType="submit"
      //     key="submit"
      //   >
      //     Tìm bạn
      //   </Button>,
      // ]}
      okText="Xác nhận"
      cancelText="Huỷ"
      centered
      onOk={handleConfirmAddFriend}
      onCancel={() => {
        setIsConfirmModalVisible(false);
      }}
      title="Add friend"
    >
      Bạn muốn kết bạn với {name}
    </Modal>
  );
};

const ModalAddFriend = ({
  isAddToGroupVisible,
  isAddFriendVisible,
  setIsAddFriendVisible,
}) => {
  const dispatch = useDispatch();

  const foundContainerRef = useRef();

  const listFriendFound = useSelector(listFriendFoundSelector);
  const isLoadingMoreFriendFound = useSelector(
    isLoadingMoreFriendFoundSelector
  );
  const token = useSelector(tokenSelector);

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [chosenFirstName, setChosenFirstName] = useState("");
  const [chosenLastName, setChosenLastName] = useState("");
  const [chosenId, setChosenId] = useState(null);
  // console.log(keyword);
  const handleFindFriend = (values) => {
    let keyword = values.keyword.replaceAll(" ", "&");
    setKeyword(keyword);
    dispatch(userSearchAction.removeListUserdFound());
    dispatch(searchUserThunk({ keyword, token, page }));
  };
  const handleOnScroll = () => {
    const container = foundContainerRef.current;
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight
    ) {
      setPage((page) => page + 1);
    }
  };

  const handleCancelModal = () => {
    setIsAddFriendVisible(false);
    setPage(1);
    setKeyword("");
    dispatch(userSearchAction.removeListUserdFound());
  };
  useEffect(() => {
    if (keyword !== "") {
      dispatch(searchUserThunk({ keyword, token, page }));
    }
  }, [page, dispatch, token]);

  return (
    <Modal
      visible={isAddFriendVisible}
      footer={[
        <Button
          type="primary"
          form="add-friend-form"
          htmlType="submit"
          key="submit"
        >
          Find
        </Button>,
      ]}
      centered
      onCancel={handleCancelModal}
      title="Add friend"
      // bodyStyle={{ height: "500px" }}
    >
      <Form id="add-friend-form" onFinish={handleFindFriend}>
        <Form.Item name="keyword">
          <Input placeholder="Type name" />
        </Form.Item>
        {!!listFriendFound.length && (
          <Form.Item style={{ display: "flex" }}>
            <div
              ref={foundContainerRef}
              style={{ height: "300px", overflow: "auto" }}
              onScroll={handleOnScroll}
            >
              {listFriendFound.map((friend, index) => (
                <div>
                  <LeftNavItem
                    key={index}
                    title={`${friend.firstName} ${friend.lastName}`}
                    img={`${
                      process.env.REACT_APP_BASE_IMAGE_URL
                    }${friend.avatar.replaceAll(" ", "-")}`}
                    rightSide={
                      // <Button type="primary" ghost>
                      //   {friend.isFriend}
                      // </Button>
                      <AddFriendBtn
                        setIsConfirmModalVisible={setIsConfirmModalVisible}
                        isFriend={friend.friendStatus}
                        isSendRequest={friend.request}
                        firstName={friend.firstName}
                        lastName={friend.lastName}
                        id={friend.id}
                        setChosenFirstName={setChosenFirstName}
                        setChosenLastName={setChosenLastName}
                        setChosenId={setChosenId}
                      ></AddFriendBtn>
                    }
                    border={false}
                  />
                  <ModalConfirm
                    isConfirmModalVisible={isConfirmModalVisible}
                    setIsConfirmModalVisible={setIsConfirmModalVisible}
                    name={`${chosenFirstName} ${chosenLastName}`}
                    id={chosenId}
                  />
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isLoadingMoreFriendFound && (
                  <Messaging height="0.5rem" width="0.5rem" color="black" />
                )}
              </div>
            </div>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ModalAddFriend;
