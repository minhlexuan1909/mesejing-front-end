import React, { forwardRef, useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { mqttPayloadSelector } from "../../../../../../services/mqtt/mqttSlice";
import {
  tokenSelector,
  userIdSelector,
} from "../../../../../auth/services/authSlice";
import {
  hasMorePageSelector,
  isGettingMessageSelector,
  messageAction,
  messageSelector,
} from "../../../../services/message/messageSlice";
import { getMessageRoomThunk } from "../../../../services/message/messageThunk";
import { selectedRoomSelector } from "../../../../services/room/roomSlice";
import MainChatFooter from "../MainChatFooter/MainChatFooter";
import SystemMessage from "../SystemMessage/SystemMessage";
import UserMessage from "../UserMessage/UserMessage";

const MainChatBody = (props, refs) => {
  // console.log(refs);
  // const { messagesEndRef, foundContainerChatRef } = refs;

  const { isShowDetail } = props;

  const dispatch = useDispatch();

  // ---------------------------------Selector------------------------------------
  const messageList = useSelector(messageSelector);
  const token = useSelector(tokenSelector);
  const userID = useSelector(userIdSelector);
  const payload = useSelector(mqttPayloadSelector);
  const roomID = useSelector(selectedRoomSelector);
  const hasMorePage = useSelector(hasMorePageSelector);
  const isGettingMessage = useSelector(isGettingMessageSelector);
  const selectedRoom = useSelector(selectedRoomSelector);

  // ---------------------------------State------------------------------------
  const [firstLoad, setFirstLoad] = useState(true); // Mark first load
  const [page, setPage] = useState(1); // PAGE LIST MESSAGES
  const [curScrollPos, setCurScollPos] = useState(null); // Save current scroll postion

  // ---------------------------------Ref------------------------------------
  const messagesEndRef = useRef(null);
  const foundContainerChatRef = useRef(null);

  // ---------------------------------Const------------------------------------
  const dataSendMessage = {
    roomId: roomID,
    ownerId: userID,
    content: "",
    contentType: "message",
  };

  // ---------------------------------Function------------------------------------

  const handleImageLoaded = () => {
    if (firstLoad) scrollToBottom();
  };

  const scrollToBottom = () => {
    if (foundContainerChatRef.current !== null) {
      messagesEndRef.current.scrollIntoView();
      // foundContainerChatRef.current.scrollTop =
      //   foundContainerChatRef.current.scrollHeight;
    }
  };
  // HANDLE SCROOL AUTO LOAD MESSAGES
  const handleOnScroll = () => {
    const container = foundContainerChatRef.current;
    if (container.scrollTop === 0 && hasMorePage) {
      console.log("change page");
      setPage((page) => page + 1);
    }
  };

  // ---------------------------------Effect------------------------------------
  // Receive data from mqtt
  useEffect(() => {
    if (payload.topic) {
      let roomIDSockets = payload.topic.split("/")[1];
      if (roomIDSockets === roomID) {
        dispatch(
          messageAction.setMessage([
            payload.message,
            ...messageList.slice(0).reverse(),
          ])
        );
      }
    }
  }, [payload]);

  // Scroll to bottom at first load
  useEffect(() => {
    if (messageList.length <= 15 && !isGettingMessage && firstLoad) {
      scrollToBottom();
    }
  }, [messageList.length, isGettingMessage]);

  // Keep scroll position when loading more messages
  useEffect(() => {
    if (!isGettingMessage && !firstLoad) {
      const container = foundContainerChatRef.current;
      if (curScrollPos !== null && container) {
        container.scrollTo(0, container.scrollHeight - curScrollPos);
      }
    }
  }, [isGettingMessage]);

  // Reset scroll position when changing room
  useEffect(() => {
    setCurScollPos(null);
  }, [selectedRoom]);

  // Save scroll position before load more
  // Load more message
  useEffect(() => {
    const container = foundContainerChatRef.current;
    setCurScollPos(container.scrollHeight - container.scrollTop);
    if (page > 1 && !isGettingMessage) {
      setFirstLoad(false);
      dispatch(
        getMessageRoomThunk({
          token: token,
          roomID: dataSendMessage.roomId,
          page: page,
        })
      );
    }
  }, [page, dispatch, token]);

  useEffect(() => {
    setPage(1);
  }, [roomID]);

  return (
    <>
      <div
        className="chatView_body"
        ref={foundContainerChatRef}
        onScroll={handleOnScroll}
      >
        {/* <div style={{ height: "10px" }} /> */}
        <div>
          {messageList !== null &&
            messageList.map((item, index) => {
              if (item.type === "system") {
                return (
                  <SystemMessage
                    item={item}
                    isLastMessage={index === messageList.length - 1}
                  />
                );
              } else {
                return (
                  <UserMessage
                    item={item}
                    handleImageLoaded={handleImageLoaded}
                    isAnother={
                      item.hasOwnProperty("owner") && item.owner._id !== userID
                    }
                    isShowNameAndAvatar={
                      index === 0
                        ? true
                        : (messageList[index - 1].hasOwnProperty("owner") &&
                            // prev message not belong to the same person
                            ((item.owner._id !== userID &&
                              messageList[index - 1].owner._id === userID) ||
                              (item.owner._id === userID &&
                                messageList[index - 1].owner._id !==
                                  userID))) ||
                          messageList[index - 1].type === "system"
                    }
                  />
                );
              }
            })}
        </div>
        <div ref={messagesEndRef} className="abc" />
        {messageList.length === 0 && (
          <div className="system-call">
            <div className="system-line"></div>
            <div className="system-message">
              <span>Nothing in here</span>
            </div>
            <div className="system-line"></div>
          </div>
        )}
      </div>
      <MainChatFooter scrollToBottom={scrollToBottom} />
    </>
  );
};

export default forwardRef(MainChatBody);
