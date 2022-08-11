import "./MainWrapper.scss";

import {
  faMagnifyingGlass,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "antd";
import React, { cloneElement, useState } from "react";

import ModalAddFriend from "../../../../profile/components/ModalAddFriend/ModalAddFriend";
import ModalAddToGroup from "../../ModalAddToGroup/ModalAddToGroup";

const MainWrapper = ({ children }) => {
  const [isAddToGroupVisible, setIsAddToGroupVisible] = useState(false);
  const [isAddFriendVisible, setIsAddFriendVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleSearchOnChange = () => {};

  return (
    <div className="left-main-wrapper">
      <div className="header">
        <Input
          placeholder="Search"
          prefix={
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          }
          // value={searchValue}
          onChange={(e) => handleSearchOnChange(e.target.value)}
        />
        <div
          className="header-icon"
          onClick={() => setIsAddFriendVisible(true)}
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </div>
        <div
          className="header-icon"
          onClick={() => setIsAddToGroupVisible(true)}
        >
          <FontAwesomeIcon icon={faUsers} />
        </div>
      </div>
      {/* Put setIsAddFriendVisible in curly brace to let React DOM know setIsAddFriendVisible is a JS function */}
      <div className="children">
        {cloneElement(children, {
          set_visible_add: { setIsAddFriendVisible },
        })}
      </div>
      <ModalAddFriend
        isAddToGroupVisible={isAddToGroupVisible}
        isAddFriendVisible={isAddFriendVisible}
        setIsAddFriendVisible={setIsAddFriendVisible}
      />
      <ModalAddToGroup
        isAddToGroupVisible={isAddToGroupVisible}
        setIsAddToGroupVisible={setIsAddToGroupVisible}
      ></ModalAddToGroup>
    </div>
  );
};

export default MainWrapper;
