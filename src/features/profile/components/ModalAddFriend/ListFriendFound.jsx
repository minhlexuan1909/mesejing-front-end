import React, { useRef, useState } from "react";
import { Messaging } from "react-cssfx-loading/lib";
import { useSelector } from "react-redux";
import LeftNavItem from "../../../../components/LeftNavItem/LeftNavItem";
import {
  isLoadingMoreFriendFoundSelector,
  listFriendFoundSelector,
} from "../../services/userSearch/userSearchSlice";
import AddFriendBtn from "./AddFriendBtn";
import ModalConfirmAddFriend from "./ModalConfirmAddFriend";

const ListFriendFound = (props) => {
  const { setPage } = props;

  const listFriendFound = useSelector(listFriendFoundSelector);
  const isLoadingMoreFriendFound = useSelector(
    isLoadingMoreFriendFoundSelector
  );

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [chosenFirstName, setChosenFirstName] = useState("");
  const [chosenLastName, setChosenLastName] = useState("");
  const [chosenId, setChosenId] = useState(null);

  const foundContainerRef = useRef();

  const handleOnScroll = () => {
    const container = foundContainerRef.current;
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight
    ) {
      setPage((page) => page + 1);
    }
  };

  return (
    <>
      {!!listFriendFound.length && (
        // <Form.Item style={{ display: "flex" }}>
        <div
          ref={foundContainerRef}
          style={{ height: "300px", overflow: "auto" }}
          onScroll={handleOnScroll}
        >
          {listFriendFound.map((friend, index) => (
            <div>
              <LeftNavItem
                key={index}
                title={`${friend.firstName} ${friend.lastName}`}
                img={`${process.env.REACT_APP_BASE_IMAGE_URL}${friend.avatar}`}
                rightSide={
                  <AddFriendBtn
                    setIsConfirmModalVisible={setIsConfirmModalVisible}
                    isFriend={friend.friendStatus}
                    isSendRequest={friend.request}
                    firstName={friend.firstName}
                    lastName={friend.lastName}
                    id={friend.id}
                    setChosenFirstName={setChosenFirstName}
                    setChosenLastName={setChosenLastName}
                    setChosenId={setChosenId}
                  ></AddFriendBtn>
                }
                border={false}
              />
              <ModalConfirmAddFriend
                isConfirmModalVisible={isConfirmModalVisible}
                setIsConfirmModalVisible={setIsConfirmModalVisible}
                name={`${chosenFirstName} ${chosenLastName}`}
                id={chosenId}
              />
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoadingMoreFriendFound && (
              <Messaging height="0.5rem" width="0.5rem" color="black" />
            )}
          </div>
        </div>
        // </Form.Item>
      )}
    </>
  );
};

export default ListFriendFound;
