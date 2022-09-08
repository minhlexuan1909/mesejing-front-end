import React from "react";
import Zoom from "react-medium-image-zoom";

const UserMessage = (props) => {
  const { item, handleImageLoaded, isAnother, isShowNameAndAvatar } = props;

  const convertDateTime = (time) => {
    let date = new Date(time);
    return date.toLocaleString();
  }


  return (
    <div
      className={`user-chat__container ${isAnother ? "another_user" : ""}`}
      key={item._id}
    >
      {isShowNameAndAvatar && (
        <span className="user_name">
          {item.owner.firstName + " " + item.owner.lastName}
        </span>
      )}
      <div className="user_img">
        {isShowNameAndAvatar && isAnother && (
          <img
            src={`${process.env.REACT_APP_BASE_IMAGE_URL}${item.owner.avatar}`}
            alt="User"
          ></img>
        )}
      </div>

      <div
        className={`user-chat_message ${
          isAnother ? "another_user-chat_message" : ""
        }`}
      >
        <div className="message_container">
          {item.contentType === "message" && <p>{item.content}</p>}
          {item.contentType === "image" && (
            <Zoom zoomMargin={20}>
              <img
                src={`${process.env.REACT_APP_BASE_IMAGE_URL}${item.content}`}
                alt=""
                style={{ width: "300px" }}
                onLoad={handleImageLoaded}
              />
            </Zoom>
          )}
          <div className="status_message">
            <span>{ convertDateTime(item.createAt) }</span>
          </div>
        </div>
      </div>
      <div className="user_img">
        {isShowNameAndAvatar && !isAnother && (
          <img
            src={`${process.env.REACT_APP_BASE_IMAGE_URL}${item.owner.avatar}`}
            alt="User"
          ></img>
        )}
      </div>
    </div>
  );
};

export default UserMessage;
