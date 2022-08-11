import React from "react";
import LeftNav from "../../../chat/components/LeftSide/LeftNav/LeftNav";
import ListAddFriend from "../../../chat/components/RightSide/ListAddFriend/ListAddFriend";

const ContactPage = () => {
  return (
    <div>
      <LeftNav defaultActiveTab={4} />
      <ListAddFriend />
    </div>
  );
};

export default ContactPage;
