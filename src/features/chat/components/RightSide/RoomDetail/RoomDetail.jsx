import React from "react";
import {
  faCaretDown,
  faCaretRight,
  faUserGroup,
  faGear,
  faArrowLeft,
  faEllipsis,
  faAddressCard,
  faUserPlus,
  faPenToSquare,
  faCamera,
  faRightFromBracket,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RoomDetail.scss";
import { useState, useEffect } from "react";
import FileTransferList from "./FileTransfer/FileTransferList";
import { Menu, Button, Dropdown } from "antd";
import {
  getUsersInRoomThunk,
  setNameOfRoomThunk,
  deleteUserInRoomThunk,
  leaveRoomThunk,
  setAvatarOfRoomThunk,
} from "../../../services/room/roomThunk";
import { tokenSelector } from "../../../../auth/services/authSlice";
import {
  usersInRommSelector,
  selectedRoomSelector,
  roomDetailSelector,
} from "../../../services/room/roomSlice";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Input } from "antd";
import { friendAction } from "../../../../profile/services/friend/friendSlice";
import { userProfileAction } from "../../../../profile/services/userProfile/userProfileSlice";
import { userIdSelector } from "../../../../auth/services/authSlice";
import axios from "axios";

const RoomDetail = () => {
  const dispatch = useDispatch();
  // SELECTOR
  const token = useSelector(tokenSelector);
  const usersInRoom = useSelector(usersInRommSelector);
  const roomDetail = useSelector(roomDetailSelector);
  // const roomDetail = useSelector(roomDetailSelector);

  // USE STATE
  const [MODE_VIEW, setMODE_VIEW] = useState(1);
  // roomDetail: 1,
  // fileTransfer: 2,
  // listUsersInRoom: 3,
  // settingsRoom: 4
  const [previewImgRoom, setPreviewImgRoom] = useState("");
  const [isOpenModalRoomSettings, setIsOpenModalRoomSettings] = useState(false);
  const [nameOfRoomInput, setNameOfRoomInput] = useState();
  const [avatarInputFile, setAvatarInputFile] = useState();

  // SELECTOR
  const roomID = useSelector(selectedRoomSelector);
  const userID = useSelector(userIdSelector);

  const handleCfRoomSettings = async () => {
    let upLoadImg = await uploadImage(avatarInputFile);

    dispatch(
      setAvatarOfRoomThunk({
        roomID: roomID,
        avatar: upLoadImg,
        token: token,
      })
    );
    dispatch(
      setNameOfRoomThunk({
        roomID: roomID,
        name: nameOfRoomInput,
        token: token,
      })
    );
    setPreviewImgRoom(upLoadImg);
    setIsOpenModalRoomSettings(false);
  };

  const handlePreviewImgRoom = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImgRoom(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setAvatarInputFile(e.target.files[0]);
  };

  const deleteUserRoom = (deleteUserID) => {
    dispatch(
      deleteUserInRoomThunk({
        roomID: roomID,
        deleteUserID: deleteUserID,
        token: token,
      })
    );
    dispatch(getUsersInRoomThunk({ roomID: roomID, token }));
  };

  const handleLeaveRoom = () => {
    dispatch(leaveRoomThunk({ roomID: roomID, token: token }));
  };

  const handleUserAvaClick = () => {
    dispatch(friendAction.setIsFriendProfileVisible(true));
    const friend = roomDetail.users.find((user) => user.userId !== userID);
    dispatch(userProfileAction.setSelectedUser(friend.userId));
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

  useEffect(() => {
    dispatch(getUsersInRoomThunk({ roomID: roomID, token }));
    setPreviewImgRoom(
      `${
        process.env.REACT_APP_BASE_IMAGE_URL
      }${roomDetail.avatarGroup.replaceAll(" ", "-")}`
    );
    // setListUsersInRoom(usersInRoom);
    // dispatch(getDetailRoomThunk({ roomID: roomID, token }));
  }, [token, dispatch, roomID]);

  return (
    <>
      {MODE_VIEW === 1 && ( //Room Detail
        <div className="chat_inf-wrapper">
          <div className="chat_inf-title">
            {/* <span>Room informations</span> */}
          </div>
          <div
            className="user_inf"
            onClick={!roomDetail.isGroup && handleUserAvaClick}
            style={!roomDetail.isGroup ? { cursor: "pointer" } : {}}
          >
            <div className="user_img">
              <img src={previewImgRoom} alt="User"></img>
            </div>

            <div className="user_name">
              {roomDetail !== null && <span>{roomDetail.name}</span>}
              {roomDetail !== null && roomDetail.isGroup === true && (
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => setIsOpenModalRoomSettings(true)}
                />
              )}
            </div>
          </div>
          {roomDetail.isGroup === true && (
            <div className="chatSettings">
              <div
                className="chatSettings-item"
                onClick={() => {
                  setMODE_VIEW(3);
                }}
              >
                <div className="item-icon">
                  <FontAwesomeIcon icon={faUserGroup} />
                </div>
                <span>{roomDetail.users.length} thành viên</span>
                <div className="chat-info-general__item"></div>
              </div>
              {roomDetail.users[0].userId === userID && (
                <div
                  className="chatSettings-item"
                  style={{ "border-bottom": "8px solid #f4f5f7" }}
                  onClick={() => setMODE_VIEW(4)}
                >
                  <div className="item-icon">
                    <FontAwesomeIcon icon={faGear} />
                  </div>
                  <span>Quản lý nhóm</span>
                </div>
              )}
            </div>
          )}

          <div className="things__shared" onClick={() => setMODE_VIEW(2)}>
            <span>Image/Video</span>
            <div className="open-btn">
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
          </div>
          <div className="things__shared" onClick={() => setMODE_VIEW(2)}>
            <span>File</span>
            <div className="open-btn">
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
          </div>
          <div className="things__shared" onClick={() => setMODE_VIEW(2)}>
            <span>Links</span>
            <div className="open-btn">
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
          </div>
          <div className="other-tools">
            <div className="tools-title">
              <span>Other settings</span>
              <div className="open-btn">
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
            <div className="tools-list_items">
              {/* <div className="tools-item">
                <div className="item-icon">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                </div>
                <span>Báo cáo</span>
                <div className="chat-info-general__item"></div>
              </div>
              <div className="tools-item">
                <div className="item-icon">
                  <FontAwesomeIcon icon={faEyeSlash} />
                </div>
                <span>Ẩn trò chuyện</span>
                <div className="chat-info-general__item"></div>
              </div> */}
              {roomDetail.isGroup && (
                <div className="tools-item" onClick={handleLeaveRoom}>
                  <div className="item-icon" style={{ color: "#db342e" }}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </div>
                  <span style={{ color: "#db342e" }}>
                    Leave the conversation
                  </span>
                </div>
              )}
            </div>
          </div>

          <Modal
            title="Chỉnh sửa thông tin nhóm"
            centered
            visible={isOpenModalRoomSettings}
            onCancel={() => setIsOpenModalRoomSettings(false)}
            onOk={handleCfRoomSettings}
            width={360}
          >
            <div className="modal-settings-container">
              <label className="room-img" htmlFor="avaUpdateRoom">
                <img src={previewImgRoom} alt="User"></img>
                <div className="camera-icons">
                  <FontAwesomeIcon icon={faCamera} />
                </div>
                <input
                  id="avaUpdateRoom"
                  type="file"
                  accept="image/*"
                  alt="ava"
                  onChange={handlePreviewImgRoom}
                  style={{ display: "none" }}
                />
              </label>
              <span>
                Bạn có chắn muốn đổi thông tin nhóm, khi xác nhận thông tin nhóm
                mới sẽ hiển thị với tất cả thành viên.
              </span>
              <div className="input-name-room">
                <Input
                  placeholder="Nhập tên nhóm"
                  value={nameOfRoomInput}
                  onChange={(e) => setNameOfRoomInput(e.target.value)}
                />
              </div>
            </div>
          </Modal>
        </div>
      )}

      {MODE_VIEW === 2 && ( // File Transfer
        <FileTransferList setMODE_VIEW={setMODE_VIEW} />
      )}

      {MODE_VIEW === 3 && ( // List Users in room
        <div className="feature-room_container">
          <div className="feature-room_header">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={() => setMODE_VIEW(1)}
            />
            <span>Thành viên</span>
          </div>
          <div className="listUsers">
            {usersInRoom.map((item) => {
              return (
                <div className="userItem">
                  <div className="user-inf">
                    <img
                      src={`${
                        process.env.REACT_APP_BASE_IMAGE_URL
                      }${item.user.avatar.replaceAll(" ", "-")}`}
                      alt="User"
                    ></img>
                    <div className="user_name">
                      <h2>{item.user.lastName + " " + item.user.firstName}</h2>
                      <p>Biet danh</p>
                    </div>
                  </div>
                  <div className="options">
                    <Dropdown
                      trigger={["click"]}
                      overlay={
                        <Menu>
                          <Menu.Item
                            key="1"
                            onClick={() => {
                              dispatch(
                                friendAction.setIsFriendProfileVisible(true)
                              );
                              // Thay doan nay bang ID cua nguoi can show profile
                              dispatch(
                                userProfileAction.setSelectedUser(item.user._id)
                              );
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faAddressCard}
                              style={{ "margin-right": "8px" }}
                            />
                            Xem profile
                          </Menu.Item>
                          <Menu.Divider />
                          {/* <Menu.Item key="2">
                        <FontAwesomeIcon icon={faUserPlus} style={{"margin-right": "8px"}}/>
                        Thêm bạn 
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="3">
                        <FontAwesomeIcon icon={faPenToSquare} style={{"margin-right": "8px"}}/>
                        Chỉnh sửa biệt danh
                      </Menu.Item> */}
                        </Menu>
                      }
                    >
                      <Button
                        shape="circle"
                        icon={<FontAwesomeIcon icon={faEllipsis} />}
                      ></Button>
                    </Dropdown>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {MODE_VIEW === 4 && ( // Settings room
        <div className="feature-room_container">
          <div className="feature-room_header">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={() => setMODE_VIEW(1)}
            />
            <span>Quản lý nhóm</span>
          </div>
          <div className="manager-settings-room">
            <div className="listUsers">
              {usersInRoom.map((item) => {
                return (
                  <div className="userItem">
                    <div className="user-inf">
                      <img
                        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                        alt="User"
                      ></img>
                      <div className="user_name">
                        <h2>
                          {item.user.lastName + " " + item.user.firstName}
                        </h2>
                        <p>Biet danh</p>
                      </div>
                    </div>
                    <div className="options">
                      <Dropdown
                        trigger={["click"]}
                        overlay={
                          <Menu>
                            <Menu.Item
                              key="1"
                              onClick={() => {
                                dispatch(
                                  friendAction.setIsFriendProfileVisible(true)
                                );
                                // Thay doan nay bang ID cua nguoi can show profile
                                dispatch(
                                  userProfileAction.setSelectedUser(
                                    item.user._id
                                  )
                                );
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faAddressCard}
                                style={{ "margin-right": "8px" }}
                              />
                              Xem profile
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item
                              key="2"
                              style={{ color: "red" }}
                              onClick={() => deleteUserRoom(item.user._id)}
                            >
                              <FontAwesomeIcon
                                icon={faTrashCan}
                                style={{ "margin-right": "8px" }}
                              />
                              Xoá thành viên
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button
                          shape="circle"
                          icon={<FontAwesomeIcon icon={faEllipsis} />}
                        ></Button>
                      </Dropdown>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="manager-list-btn">
              <div className="manager-btn">
                <span>Rời nhóm</span>
              </div>
              <div className="manager-btn">
                <span>Xoá nhóm</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomDetail;
