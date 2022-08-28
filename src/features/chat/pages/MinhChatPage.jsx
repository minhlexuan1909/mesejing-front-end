import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { tokenSelector, userIdSelector } from "../../auth/services/authSlice";
import {
  getListFriendedThunk,
  getListRequestInQueueThunk,
} from "../../profile/services/friend/friendThunk";
import LeftNav from "../components/LeftSide/LeftNav/LeftNav";
import MainChat from "../components/RightSide/MainChat/MainChat";
import FriendProfile from "../components/RightSide/FriendProfile/FriendProfile";
import ListAddFriend from "../components/RightSide/ListAddFriend/ListAddFriend";
import { Row, Col, Layout } from "antd";
import { useState } from "react";
import { getRoomsThunk } from "../services/room/roomThunk";
// import { getMeThunk } from "../../auth/services/authThunk";
import { getUserByIdThunk } from "../../profile/services/userProfile/userProfileThunk";
import { selectedUserProfileSelector } from "../../profile/services/userProfile/userProfileSlice";
import {
  clientSelector,
  mqttAction,
  mqttPayloadSelector,
} from "../../../services/mqtt/mqttSlice";
import { roomAction, roomsSelector } from "../services/room/roomSlice";
import mqtt from "../../../../node_modules/mqtt/dist/mqtt";
import { friendAction } from "../../profile/services/friend/friendSlice";
import { getMeThunk } from "../../profile/services/selfProfile/selfProfileThunk";

const MinhChatPage = () => {
  const dispatch = useDispatch();

  const leftNavRef = useRef();

  const [isFriendProfileVisible, setFriendProfileVisible] = useState(false);

  const token = useSelector(tokenSelector);
  const selectedUserProfile = useSelector(selectedUserProfileSelector);
  const rooms = useSelector(roomsSelector);
  const userId = useSelector(userIdSelector);

  useEffect(() => {
    dispatch(getListFriendedThunk(token));
    dispatch(getRoomsThunk(token));
    dispatch(getMeThunk(token));
    dispatch(getListRequestInQueueThunk(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (userId) {
      dispatch(getUserByIdThunk({ userId: selectedUserProfile, token }));
    }
  }, [selectedUserProfile, token, dispatch]);

  // Connect MQTT
  const client = useSelector(clientSelector);
  const payload = useSelector(mqttPayloadSelector);
  const mqttConnect = (host, mqttOption) => {
    dispatch(mqttAction.setConnectionStatus("Connecting"));
    dispatch(mqttAction.setClient(mqtt.connect(host, mqttOption)));
  };

  const mqttSubscribe = (topic, qos) => {
    if (client) {
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        // console.log(`Sub Topic: ${topic}`);
        dispatch(mqttAction.setIsSubed(true));
      });
    }
  };

  useEffect(() => {
    const url = process.env.REACT_APP_MQTT_SERVER;
    // const url = 'ws://ip172-18-0-109-cacfnok33d5g00bo3thg-1883.direct.labs.play-with-docker.com/';
    // const url = process.env.MQTT_SERVER;
    // const url =
    //   "ws://ip172-18-0-109-cacfnok33d5g00bo3thg-1883.direct.labs.play-with-docker.com/";
    const options = {
      keepalive: 30,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: "WillMsg",
        payload: "Connection Closed abnormally..!",
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    };
    mqttConnect(url, options);
  }, []);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        dispatch(mqttAction.setConnectionStatus("Connected"));
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        dispatch(mqttAction.setConnectionStatus("Reconnecting"));
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: JSON.parse(message) };
        dispatch(mqttAction.setMqttPayload(payload));
      });
    }
  }, [client]);

  useEffect(() => {
    rooms.forEach((room) => mqttSubscribe(`ROOM/${room._id}`, 0));
    // rooms.forEach((room) => mqttSubscribe(`ROOM/${room._id}`, 0));
  }, [rooms.length, client]);
  useEffect(() => {
    mqttSubscribe(`USER/${userId}`, 0);
  }, [userId, client]);

  useEffect(() => {
    const topic = payload.topic;
    if (topic) {
      const message = payload.message;
      const event = payload.message.event;
      if (event === "messageNew") {
        const roomID = topic.slice(5);
        dispatch(roomAction.pushRoomToTop(roomID));
        const lastMessage = payload.message.content;
        const isSeen = userId === payload.message.owner._id;
        dispatch(roomAction.changeLastMessage({ roomID, lastMessage, isSeen }));
      } else if (event === "friendRequest") {
        const user = {
          firstName: message.firstName,
          lastName: message.lastName,
          avatar: message.avatar,
          _id: message.userId,
          request: false,
        };
        dispatch(friendAction.addUserToListFriendInQueue(user));
      } else if (event === "newRoom") {
        dispatch(roomAction.addRoom(message.room));
      }
    }
  }, [payload]);

  return (
    <div>
      {/* <Row>
        <Col span={18} push={6}>
          <MainChat setFriendProfileVisible={setFriendProfileVisible} />
        </Col>
        <Col span={6} pull={18}>
          <FriendProfile
            isFriendProfileVisible={isFriendProfileVisible}
            setFriendProfileVisible={setFriendProfileVisible}
          />
          <LeftNav />
        </Col>
      </Row> */}
      <FriendProfile
        isFriendProfileVisible={isFriendProfileVisible}
        setFriendProfileVisible={setFriendProfileVisible}
      />
      <Row>
        {/* <Col lg={6} md={8} sm={24} xs={24}>
          <FriendProfile
            isFriendProfileVisible={isFriendProfileVisible}
            setFriendProfileVisible={setFriendProfileVisible}
          />
          <LeftNav />
        </Col>
        <Col lg={18} md={16} sm={0} xs={0}>
          <MainChat setFriendProfileVisible={setFriendProfileVisible} />
          <ListAddFriend/>
        </Col> */}
        <LeftNav />
      </Row>
      {/* <Layout>
        <Sider theme="light" onBreakpoint={() => {}}>
          <LeftNav ref={leftNavRef}></LeftNav>
        </Sider>
        <Content>
          <MainChat setFriendProfileVisible={setFriendProfileVisible} />
        </Content>
      </Layout> */}
    </div>
  );
};

export default MinhChatPage;
