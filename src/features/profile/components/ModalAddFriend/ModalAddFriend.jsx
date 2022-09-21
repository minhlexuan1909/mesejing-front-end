import { Button, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { tokenSelector } from "../../../auth/services/authSlice";
import { userSearchAction } from "../../services/userSearch/userSearchSlice";
import { searchUserThunk } from "../../services/userSearch/userSearchThunk";
import ListFriendFound from "./ListFriendFound";
import SearchFriendForm from "./SearchFriendForm";

const ModalAddFriend = ({
  isAddToGroupVisible,
  isAddFriendVisible,
  setIsAddFriendVisible,
}) => {
  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);

  const [page, setPage] = useState(1);

  const [keyword, setKeyword] = useState("");

  const handleCancelModal = () => {
    setKeyword("");
    setIsAddFriendVisible(false);
    setPage(1);
    dispatch(userSearchAction.removeListUserdFound());
  };

  useEffect(() => {
    console.log("changed");
    if (keyword !== "") {
      dispatch(searchUserThunk({ keyword, token, page }));
    }
  }, [page, dispatch, token]);

  return (
    <Modal
      visible={isAddFriendVisible}
      footer={
        null
        //   [
        //   <Button
        //     type="primary"
        //     form="add-friend-form"
        //     htmlType="submit"
        //     key="submit"
        //   >
        //     Find
        //   </Button>,
        // ]
      }
      centered
      onCancel={handleCancelModal}
      title="Add friend"
    >
      <SearchFriendForm
        keyword={keyword}
        setKeyword={setKeyword}
        page={page}
        setPage={setPage}
      />
      <ListFriendFound setPage={setPage} />
    </Modal>
  );
};

export default ModalAddFriend;
