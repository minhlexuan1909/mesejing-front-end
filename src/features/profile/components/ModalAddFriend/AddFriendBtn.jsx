import { Button } from "antd";
import React from "react";

const AddFriendBtn = ({
  isFriend,
  isSendRequest,
  setIsConfirmModalVisible,
  firstName,
  lastName,
  id,
  setChosenFirstName,
  setChosenLastName,
  setChosenId,
}) => {
  // console.log(isFriend);
  let status;
  if (isFriend === "stranger") status = "Add friend";
  else if (isFriend === "inqueue") {
    if (isSendRequest === true) {
      status = "Sent";
    } else status = "Waiting for your approval";
  } else if (isFriend === "friend") status = "Friend";
  return (
    <Button
      type={isFriend === "stranger" ? "default" : "primary"}
      ghost={isFriend === "not"}
      onClick={
        isFriend === "stranger"
          ? () => {
              setIsConfirmModalVisible(true);
              setChosenFirstName(firstName);
              setChosenLastName(lastName);
              setChosenId(id);
            }
          : () => {}
      }
    >
      {status}
    </Button>
  );
};

export default AddFriendBtn;
