import { Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokenSelector } from "../../../auth/services/authSlice";
import { userSearchAction } from "../../services/userSearch/userSearchSlice";
import { searchUserThunk } from "../../services/userSearch/userSearchThunk";

const SearchFriendForm = (props) => {
  const { page, setKeyword } = props;

  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);

  const handleFindFriend = (values) => {
    let keyword = values.keyword.replaceAll(" ", "&");
    setKeyword(keyword);
    dispatch(userSearchAction.removeListUserdFound());
    dispatch(searchUserThunk({ keyword, token, page }));
  };
  return (
    <Form id="add-friend-form" onFinish={handleFindFriend}>
      <Form.Item name="keyword">
        <Input placeholder="Type name" />
      </Form.Item>
    </Form>
  );
};

export default SearchFriendForm;
