import React from "react";

const SystemMessage = (props) => {
  const { item, isLastMessage } = props;
  return (
    <div>
      <div className="system-call" key={item._id}>
        <div className="system-line"></div>
        <div className="system-message">
          <span>{item.content}</span>
        </div>
        <div className="system-line"></div>
        {isLastMessage && <img className="chatView__last-message" />}
      </div>
    </div>
  );
};

export default SystemMessage;
