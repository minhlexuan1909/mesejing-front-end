import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokenSelector } from "../../../auth/services/authSlice";
import { requestFriendThunk } from "../../services/friend/friendThunk";

const ModalConfirmAddFriend = ({
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

export default ModalConfirmAddFriend;
