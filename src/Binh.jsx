import React from "react";
import MainChat from "./features/chat/components/RightSide/MainChat/MainChat";
import FriendProfile from "./features/chat/components/RightSide/FriendProfile/FriendProfile";
import { Row, Col } from "antd";
import HookMqtt from "./services/mqtt";
import {mqttPayloadSelector} from "./services/mqtt/mqttSlice";
import { useDispatch, useSelector } from "react-redux";
// import Opening from "./features/chat/components/RightSide/Opening/Opening";
import { useState } from "react";

const Binh = () => {

  const [isFriendProfileVisible, setFriendProfileVisible] = useState(false);
  
  const receiver = useSelector(mqttPayloadSelector);
  const dispatch = useDispatch();

  console.log(receiver);

  return (
    <div >
      <Row style={{ height: "100%"}}> 
        <Col span={18} push={6}>
          {/* <Opening></Opening> */}
          <MainChat 
            setFriendProfileVisible={setFriendProfileVisible}
          />
        </Col>
        <Col span={6} pull={18} style={{"padding": "40px"}}>
          <FriendProfile 
            isFriendProfileVisible={isFriendProfileVisible} 
            setFriendProfileVisible={setFriendProfileVisible}
          />
          <HookMqtt />
        </Col>
      </Row>
    </div>
  );
};

export default Binh;
