import React, { useEffect, useState } from "react";
import { Card, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { mqttPayloadSelector } from "./mqttSlice";
import { messageAction, messageSelector } from "../../features/chat/services/message/messageSlice";

const Receiver = () => {
  const dispatch = useDispatch();

  const payload = useSelector(mqttPayloadSelector);
  const [messages, setMessages] = useState([]);

  const messageList = useSelector(messageSelector);

  useEffect(() => {
    console.log(payload);
    if (payload.topic) {
      setMessages((messages) => [...messages, payload]);
      // if (payload.topic.startsWith("ROOM")) {
      //   dispatch(roomAction.setMessage([...message, payload.message]));
      // }
      dispatch(messageAction.setMessage([...messageList, payload.message]));
      console.log(messageList);
      console.log(payload, 'alo' );
    }
  }, [payload]);

  const renderListItem = (item) => (
    <List.Item>
      <List.Item.Meta title={item.topic} description={item.message} />
    </List.Item>
  );

  return (
    <Card title="Receiver">
      <List
        size="small"
        bordered
        dataSource={messages}
        renderItem={renderListItem}
      />
    </Card>
  );
};

export default Receiver;
