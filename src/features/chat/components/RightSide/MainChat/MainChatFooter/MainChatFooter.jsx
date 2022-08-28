import {
  faFaceLaughBeam,
  faFileArrowUp,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  tokenSelector,
  userIdSelector,
} from "../../../../../auth/services/authSlice";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { sendMessageThunk } from "../../../../services/message/messageThunk";
import { selectedRoomSelector } from "../../../../services/room/roomSlice";

const MainChatFooter = (props) => {
  const { scrollToBottom } = props;

  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);
  const userID = useSelector(userIdSelector);
  const roomID = useSelector(selectedRoomSelector);

  const [inputTextMessage, setInputTextMessage] = useState("");
  const [isShowEmojis, setIsShowEmojis] = useState(false);
  const [imgFile, setImgFile] = useState();

  const wrapperTblIcons = useRef(null);

  const dataSendMessage = {
    roomId: roomID,
    ownerId: userID,
    content: "",
    contentType: "message",
  };

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

  return (
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
            <FontAwesomeIcon className="hvr-pulse-grow" icon={faFileArrowUp} />
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
  );
};

export default MainChatFooter;
