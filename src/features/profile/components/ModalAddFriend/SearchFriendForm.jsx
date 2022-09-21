import { Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokenSelector } from "../../../auth/services/authSlice";
import { userSearchAction } from "../../services/userSearch/userSearchSlice";
import { searchUserThunk } from "../../services/userSearch/userSearchThunk";

const SearchFriendForm = (props) => {
  const { keyword, setKeyword, page, setPage } = props;

  const dispatch = useDispatch();

  // Ref keep its value after re-render => use it to keep timeout
  const friendInputRef = useRef(null);

  const token = useSelector(tokenSelector);

  const handleInputChange = (e) => {
    setPage(1);

    setKeyword(e.target.value);

    if (friendInputRef.current) {
      clearTimeout(friendInputRef.current);
    }

    friendInputRef.current = setTimeout(() => {
      handleFindFriend(e.target.value);
    }, 1000);
  };

  // const handleFindFriend = (values) => {
  //   console.log("search");
  //   let keyword = values.keyword.replaceAll(" ", "&");
  //   setKeyword(keyword);
  //   dispatch(userSearchAction.removeListUserdFound());
  //   dispatch(searchUserThunk({ keyword, token, page }));
  // };

  const handleFindFriend = (keyword) => {
    let keywordConverted = keyword.trim().replaceAll(" ", "&");
    setKeyword(keywordConverted);
    dispatch(userSearchAction.removeListUserdFound());
    if (keywordConverted !== "") {
      dispatch(searchUserThunk({ keyword: keywordConverted, token, page }));
    }
  };

  return (
    <Form
      id="add-friend-form"
      // onFinish={handleFindFriend}
    >
      {/* <Input
          ref={friendInputRef}
          placeholder="Type name"
          onChange={handleInputChange}
        /> */}
      {/* Debounce works with normal input */}
      <input
        value={keyword}
        class="ant-input"
        ref={friendInputRef}
        placeholder="Type name"
        onChange={handleInputChange}
      />
    </Form>
  );
};

export default SearchFriendForm;
