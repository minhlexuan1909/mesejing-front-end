import {
  faChevronLeft,
  faEllipsis,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Shimmer from "react-shimmer-effect";

import { userIdSelector } from "../../../../../auth/services/authSlice";
import { friendAction } from "../../../../../profile/services/friend/friendSlice";
import { userProfileAction } from "../../../../../profile/services/userProfile/userProfileSlice";
import { isGettingMessageSelector } from "../../../../services/message/messageSlice";
import {
  roomAction,
  roomDetailSelector,
} from "../../../../services/room/roomSlice";
import AddFriendToGroup from "../../AddFriendToGroup/AddFriendToGroup";

const MainChatHeader = (props) => {
  const { setIsShowDetail } = props;
  const dispatch = useDispatch();

  const isGettingMessage = useSelector(isGettingMessageSelector);
  const roomDetail = useSelector(roomDetailSelector);
  const userID = useSelector(userIdSelector);

  const [isAddToGroupVisible, setIsAddToGroupVisible] = useState(false);

  const handleBackBtnClick = () => {
    dispatch(roomAction.setSelectedRoom(null));
  };

  const handleFriendImageClick = () => {
    dispatch(friendAction.setIsFriendProfileVisible(true));
    const friend = roomDetail.users.find((user) => user.userId !== userID);
    dispatch(userProfileAction.setSelectedUser(friend.userId));
  };

  return (
    <div className="chatView__header">
      <>
        <div className="chatView__header-user">
          <div className="chatView__back-btn" onClick={handleBackBtnClick}>
            <FontAwesomeIcon size="lg" icon={faChevronLeft} />
          </div>
          {isGettingMessage ? (
            <Shimmer>
              <div
                style={{
                  height: "48px",
                  width: "48px",
                  borderRadius: "50%",
                }}
              ></div>
            </Shimmer>
          ) : (
            <div
              className="user_img hvr-pulse-grow"
              onClick={handleFriendImageClick}
            >
              <img
                src={
                  roomDetail !== null &&
                  roomDetail.hasOwnProperty("avatarGroup")
                    ? `${process.env.REACT_APP_BASE_IMAGE_URL}${roomDetail.avatarGroup}`
                    : ""
                }
                alt="User"
              ></img>
            </div>
          )}

          <div className="user_inf">
            <div className="user_name">
              {isGettingMessage ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Shimmer>
                    <div
                      style={{
                        width: "150px",
                        height: "20px",
                        marginBottom: "7px",
                      }}
                    ></div>
                    <div style={{ width: "100px", height: "10px" }}></div>
                  </Shimmer>
                </div>
              ) : (
                <>
                  {roomDetail !== null && <h2>{roomDetail.name}</h2>}

                  {(roomDetail !== null && roomDetail.isGroup) === true && (
                    <p>{roomDetail.users.length} thành viên</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {!isGettingMessage && (
          <div className="header-ListOptions">
            <div
              className="header-option"
              onClick={() => setIsAddToGroupVisible(true)}
            >
              <FontAwesomeIcon icon={faUserPlus} />
            </div>
            <div
              className="header-option"
              onClick={() => setIsShowDetail((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
          </div>
        )}
      </>
      {isAddToGroupVisible && (
        <AddFriendToGroup
          isAddToGroupVisible={isAddToGroupVisible}
          setIsAddToGroupVisible={setIsAddToGroupVisible}
        />
      )}
    </div>
  );
};

export default MainChatHeader;
