import React from "react";
import {
  faEllipsis,
  faFaceLaughBeam,
  faFileArrowUp,
  faHeart,
  faMagnifyingGlass,
  faPaperPlane,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./MainChat.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import Picker from "emoji-picker-react";
import RoomDetail from "../RoomDetail/RoomDetail";
import { friendAction } from "../../../../profile/services/friend/friendSlice";
import { userProfileAction } from "../../../../profile/services/userProfile/userProfileSlice";
import {
  tokenSelector,
  userIdSelector,
} from "../../../../auth/services/authSlice";
import {
  messageAction,
  messageSelector,
  moreMessageSelector,
  hasMorePageSelector,
  isGettingMessageSelector,
} from "../../../services/message/messageSlice";
import {
  sendMessageThunk,
  getMessageRoomThunk,
  getMoreMessageRoomThunk,
} from "../../../services/message/messageThunk";
import { mqttPayloadSelector } from "../../../../../services/mqtt/mqttSlice";
import {
  selectedRoomSelector,
  roomDetailSelector,
  selectedRoomAtFriendListSelector,
} from "../../../services/room/roomSlice";
import { getDetailRoomThunk } from "../../../services/room/roomThunk";
import AddFriendToGroup from "../AddFriendToGroup/AddFriendToGroup";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import Shimmer from "react-shimmer-effect";

const MainChat = ({ place, setFriendProfileVisible }) => {
  const dispatch = useDispatch();

  // SELECTOR
  const messageList = useSelector(messageSelector);
  const token = useSelector(tokenSelector);
  const userID = useSelector(userIdSelector);
  const payload = useSelector(mqttPayloadSelector);
  const roomDetail = useSelector(roomDetailSelector);
  const roomID = useSelector(selectedRoomSelector);
  const hasMorePage = useSelector(hasMorePageSelector);
  const isGettingMessage = useSelector(isGettingMessageSelector);

  // STATE
  // const [roomID, setRoomID] = useState(null);
  const [inputTextMessage, setInputTextMessage] = useState("");
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEmojis, setIsShowEmojis] = useState(false);
  const [page, setPage] = useState(1); // PAGE LIST MESSAGES
  const [isAddToGroupVisible, setIsAddToGroupVisible] = useState(false);
  const [imgFile, setImgFile] = useState();
  // Save current scroll postion
  const [curScrollPos, setCurScollPos] = useState(null);

  //CONST
  const dataSendMessage = {
    roomId: roomID,
    ownerId: userID,
    content: "",
    contentType: "message",
  };

  // REF
  const messagesEndRef = useRef(null);
  const wrapperTblIcons = useRef(null);
  const foundContainerChatRef = useRef();

  // AUTO SCROLL TO BOTTOM
  const scrollToBottom = () => {
    if (messageList.length !== 0 && messagesEndRef.current !== null) {
      // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      const container = foundContainerChatRef.current;
      container.scrollTo(0, container.scrollHeight);
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, []);
  useEffect(() => {
    if (messageList.length <= 15 && !isGettingMessage) {
      scrollToBottom();
    }
  }, [messageList, isGettingMessage]);

  // Turn off table Icons when clicking outside
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /* Handle clicked on outside of element */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsShowEmojis(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperTblIcons);

  // HANDLE SCROOL AUTO LOAD MESSAGES
  const handleOnScroll = () => {
    const container = foundContainerChatRef.current;

    if (container.scrollTop === 0 && hasMorePage) {
      setPage((page) => page + 1);
    }
  };

  const handleSendMessage = (e) => {
    if (e.key === "Enter") {
      if (inputTextMessage === "") return;
      dataSendMessage.content = inputTextMessage;
      dispatch(sendMessageThunk({ ...dataSendMessage, token }));
      // dispatch(messageAction.setMessage([...messageList, dataSendMessage.content]))
      setInputTextMessage("");
      scrollToBottom();
    }
  };

  const handleSendMessageBtn = () => {
    // setInputTextMessage()
    if (inputTextMessage === "") return;
    dataSendMessage.content = inputTextMessage;
    dispatch(sendMessageThunk({ ...dataSendMessage, token }));
    // dispatch(messageAction.setMessage([...messageList, dataSendMessage.content]))
    setInputTextMessage("");
    scrollToBottom();
  };

  const handleOnChangeInputSend = (e) => {
    setInputTextMessage(e.target.value);
  };

  const onEmojiClick = (event, emojiObject) => {
    setInputTextMessage(inputTextMessage + emojiObject.emoji);
  };

  const uploadImg = async (e) => {
    let uploadImg = await uploadImage(e.target.files[0]);
    dataSendMessage.content = uploadImg;
    dataSendMessage.contentType = "image";
    dispatch(sendMessageThunk({ ...dataSendMessage, token }));
    setImgFile(
      `${process.env.REACT_APP_BASE_IMAGE_URL}${uploadImg.replaceAll(" ", "-")}`
    );
  };

  const uploadImage = async (fileImg) => {
    let data = new FormData();
    data.append("image", fileImg);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_IMAGE_URL}upload`,
        data,
        config
      );
      // console.log("server res: ", res);
      return res.data.filename;
    } catch (err) {
      // console.log("Eroor: ", err);
    }
  };
  const handleFriendImageClick = () => {
    dispatch(friendAction.setIsFriendProfileVisible(true));
    const friend = roomDetail.users.find((user) => user.userId !== userID);
    dispatch(userProfileAction.setSelectedUser(friend.userId));
  };
  // USE EFFECT

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
    // console.log(payload);
  }, [payload]);

  useEffect(() => {
    // dispatch(messageAction.removeMessage())
    const container = foundContainerChatRef.current;
    setCurScollPos(container.scrollHeight - container.scrollTop);
    if (page > 1) {
      dispatch(
        getMessageRoomThunk({
          token: token,
          roomID: dataSendMessage.roomId,
          page: page,
        })
      );
    }
  }, [page, dispatch, token]);

  // Keep scroll position when loading more messages
  useEffect(() => {
    if (!isGettingMessage) {
      const container = foundContainerChatRef.current;
      if (curScrollPos !== null && container) {
        container.scrollTo(0, container.scrollHeight - curScrollPos);
      }
    }
  }, [messageList.length]);

  // Get message when room ID was changed
  useEffect(() => {
    dispatch(messageAction.removeMessage());
    setPage(1);
    dispatch(
      getMessageRoomThunk({
        token: token,
        roomID: dataSendMessage.roomId,
        // Set page is async func => May not take effect right away => Put 1 here
        page: 1,
      })
    );
    dispatch(getDetailRoomThunk({ roomID: roomID, token }));
    setIsShowDetail(false);
  }, [roomID, dispatch, token]);
  if (roomID)
    return (
      <div className="mainChat__container">
        <div className="mainChat__wrapper">
          <div className="chatView__header">
            <>
              <div className="chatView__header-user">
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
                          ? `${
                              process.env.REACT_APP_BASE_IMAGE_URL
                            }${roomDetail.avatarGroup.replaceAll(" ", "-")}`
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

                        {(roomDetail !== null && roomDetail.isGroup) ===
                          true && <p>{roomDetail.users.length} thành viên</p>}
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
                    onClick={() => setIsShowDetail(!isShowDetail)}
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                </div>
              )}
            </>
          </div>
          <div
            className="chatView_body"
            ref={foundContainerChatRef}
            onScroll={handleOnScroll}
          >
            {messageList !== null &&
              messageList.map((item, index) => {
                if (item.type === "system") {
                  return (
                    <div className="system-call">
                      <div className="system-line"></div>
                      <div className="system-message">
                        <span>{item.content}</span>
                      </div>
                      <div className="system-line"></div>
                      {index === messageList.length - 1 && (
                        <div
                          ref={messagesEndRef}
                          style={{ display: "absolute" }}
                        />
                      )}
                    </div>
                  );
                } else {
                  if (index === 1 && item.type !== "system") {
                    if (
                      item.hasOwnProperty("owner") &&
                      item.owner._id === userID
                    ) {
                      return (
                        <div className="user-chat__container">
                          <span className="user_name">
                            {item.owner.firstName + " " + item.owner.lastName}
                          </span>
                          <div className="user-chat_message">
                            <div className="message_container">
                              {item.contentType === "message" && (
                                <p>{item.content}</p>
                              )}
                              {item.contentType === "image" && (
                                <Zoom zoomMargin={20}>
                                  <img
                                    src={`${
                                      process.env.REACT_APP_BASE_IMAGE_URL
                                    }${item.content.replaceAll(" ", "-")}`}
                                    alt=""
                                    style={{ width: "300px" }}
                                  />
                                </Zoom>
                              )}
                              <div className="status_message">
                                <span>{item.createAt}</span>
                              </div>
                            </div>
                          </div>
                          <div className="user_img">
                            <img
                              src={`${
                                process.env.REACT_APP_BASE_IMAGE_URL
                              }${item.owner.avatar.replaceAll(" ", "-")}`}
                              alt="User"
                            ></img>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="user-chat__container another_user">
                          <span className="user_name">
                            {item.owner.firstName + " " + item.owner.lastName}
                          </span>
                          <div className="user_img">
                            <img
                              src={`${
                                process.env.REACT_APP_BASE_IMAGE_URL
                              }${item.owner.avatar.replaceAll(" ", "-")}`}
                              alt="User"
                            ></img>
                          </div>
                          <div className="user-chat_message another_user-chat_message">
                            <div className="message_container">
                              {item.contentType === "message" && (
                                <p>{item.content}</p>
                              )}
                              {item.contentType === "image" && (
                                <Zoom zoomMargin={20}>
                                  <img
                                    src={`${
                                      process.env.REACT_APP_BASE_IMAGE_URL
                                    }${item.content.replaceAll(" ", "-")}`}
                                    alt=""
                                    style={{ width: "300px" }}
                                  />
                                </Zoom>
                              )}
                              <div className="status_message">
                                <span>{item.createAt}</span>
                              </div>
                            </div>
                          </div>
                          {index === messageList.length - 1 && (
                            <div
                              ref={messagesEndRef}
                              style={{ display: "absolute" }}
                            />
                          )}
                        </div>
                      );
                    }
                  } else if (index > 1 && item.type !== "system") {
                    // Render Item which index > 0
                    // TH1: item.owner_id === userID
                    // TH2: item.owner_id !== userID
                    if (
                      item.hasOwnProperty("owner") &&
                      item.owner._id === userID
                    ) {
                      return (
                        <div className="user-chat__container">
                          {messageList[index - 1].hasOwnProperty("owner") &&
                            messageList[index - 1].owner._id !== userID && (
                              <span className="user_name">
                                {item.owner.firstName +
                                  " " +
                                  item.owner.lastName}
                              </span>
                            )}
                          <div className="user-chat_message">
                            <div className="message_container">
                              {item.contentType === "message" && (
                                <p>{item.content}</p>
                              )}
                              {item.contentType === "image" && !!item.content && (
                                <Zoom zoomMargin={20}>
                                  <img
                                    src={`${
                                      process.env.REACT_APP_BASE_IMAGE_URL
                                    }${item.content.replaceAll(" ", "-")}`}
                                    alt=""
                                    style={{ width: "300px" }}
                                  />
                                </Zoom>
                              )}
                              <div className="status_message">
                                <span>{item.createAt}</span>
                              </div>
                            </div>
                          </div>
                          <div className="user_img">
                            {messageList[index - 1].hasOwnProperty("owner") &&
                              messageList[index - 1].owner._id !== userID && (
                                <img
                                  src={`${
                                    process.env.REACT_APP_BASE_IMAGE_URL
                                  }${item.owner.avatar.replaceAll(" ", "-")}`}
                                  alt="User"
                                ></img>
                              )}
                          </div>
                          {index === messageList.length - 1 && (
                            <div
                              ref={messagesEndRef}
                              style={{ position: "absolute" }}
                            />
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div className="user-chat__container another_user">
                          {messageList[index - 1].hasOwnProperty("owner") &&
                            messageList[index - 1].owner._id === userID && (
                              <span className="user_name">
                                {item.owner.firstName +
                                  " " +
                                  item.owner.lastName}
                              </span>
                            )}
                          <div className="user_img">
                            {messageList[index - 1].hasOwnProperty("owner") &&
                              messageList[index - 1].owner._id === userID && (
                                <img
                                  src={`${
                                    process.env.REACT_APP_BASE_IMAGE_URL
                                  }${item.owner.avatar.replaceAll(" ", "-")}`}
                                  alt="User"
                                ></img>
                              )}
                          </div>
                          <div className="user-chat_message another_user-chat_message">
                            <div className="message_container">
                              {item.contentType === "message" && (
                                <p>{item.content}</p>
                              )}
                              {item.contentType === "image" && (
                                <Zoom zoomMargin={20}>
                                  <img
                                    src={`${
                                      process.env.REACT_APP_BASE_IMAGE_URL
                                    }${item.content.replaceAll(" ", "-")}`}
                                    alt=""
                                    style={{ width: "300px" }}
                                  />
                                </Zoom>
                              )}
                              <div className="status_message">
                                <span>{item.createAt}</span>
                              </div>
                            </div>
                          </div>
                          {index === messageList.length - 1 && (
                            <div
                              ref={messagesEndRef}
                              style={{ position: "absolute" }}
                            />
                          )}
                        </div>
                      );
                    }
                  }
                }
                // Render first item
              })}
            <div ref={messagesEndRef} />
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
          <div className="chatView_footer">
            <div className="chatView-input">
              <Input
                placeholder="Nhập tin nhắn"
                bordered={false}
                size={"large"}
                onKeyDown={handleSendMessage}
                onChange={handleOnChangeInputSend}
                value={inputTextMessage}
              />
            </div>
            <div className="chatView-input_options">
              <div>
                <label htmlFor="input_file">
                  <FontAwesomeIcon
                    className="hvr-pulse-grow"
                    icon={faFileArrowUp}
                  />
                  <input
                    id="input_file"
                    type="file"
                    name="file-upload"
                    onChange={uploadImg}
                    style={{ display: "none" }}
                  ></input>
                </label>
              </div>
              <div className="emojis_containers">
                {isShowEmojis ? (
                  <div className="emojis_table" ref={wrapperTblIcons}>
                    <Picker onEmojiClick={onEmojiClick} />
                  </div>
                ) : null}
                <FontAwesomeIcon
                  className="hvr-pulse-grow"
                  icon={faFaceLaughBeam}
                  onClick={() => setIsShowEmojis(!isShowEmojis)}
                />
                {/* {chosenEmoji ? (
                <span>You chose: {chosenEmoji.emoji}</span>
              ) : (
                <span>No emoji Chosen</span>
              )} */}
              </div>
              <div className="heart-icons">
                <FontAwesomeIcon className="hvr-pulse-grow" icon={faHeart} />
              </div>
              <FontAwesomeIcon
                className="hvr-pulse-grow"
                icon={faPaperPlane}
                onClick={handleSendMessageBtn}
              />
            </div>
          </div>
        </div>
        {isShowDetail && <RoomDetail roomDetail={roomDetail} />}
        {isAddToGroupVisible && (
          <AddFriendToGroup
            isAddToGroupVisible={isAddToGroupVisible}
            setIsAddToGroupVisible={setIsAddToGroupVisible}
          />
        )}
      </div>
    );
};

export default MainChat;
