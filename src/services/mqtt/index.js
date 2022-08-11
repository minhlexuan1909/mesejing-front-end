import React, { createContext, useEffect } from "react";
import Connection from "./Connection";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";
import Receiver from "./Receiver";
import mqtt from "mqtt/dist/mqtt";
import { useDispatch, useSelector } from "react-redux";
import {
  mqttAction,
  clientSelector,
  connectionStatusSelector,
  isSubedSelector,
  mqttPayloadSelector,
} from "./mqttSlice";

export const QosOption = createContext([]);
const qosOption = [
  {
    label: "0",
    value: 0,
  },
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
];

const HookMqtt = () => {
  // const [client, setClient] = useState(null);
  // const [isSubed, setIsSub] = useState(false);
  // const [payload, setPayload] = useState({});
  // const [connectStatus, setConnectStatus] = useState('Connect');
  const dispatch = useDispatch();

  const client = useSelector(clientSelector);
  const isSubed = useSelector(isSubedSelector);
  const mqttPayload = useSelector(mqttPayloadSelector);
  const connectionStatus = useSelector(connectionStatusSelector);

  const mqttConnect = (host, mqttOption) => {
    // setConnectStatus("Connecting");
    dispatch(mqttAction.setConnectionStatus("Connecting"));
    // setClient(mqtt.connect(host, mqttOption));
    dispatch(mqttAction.setClient(mqtt.connect(host, mqttOption)));
  };

  useEffect(() => {
    if (client) {
      console.log(client);
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
        const payload = { topic, message: message.toString() };
        // setPayload(payload);
        dispatch(mqttAction.setMqttPayload(payload));
      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        // setConnectStatus("Connect");
        dispatch(mqttAction.setConnectionStatus("Connect"));
      });
    }
  };

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        // setIsSub(true);
        dispatch(mqttAction.setIsSubed(true));
      });
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        dispatch(mqttAction.setIsSubed(false));
      });
    }
  };

  return (
    <>
      <Connection
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectBtn={connectionStatus}
      />
      <QosOption.Provider value={qosOption}>
        <Subscriber sub={mqttSub} unSub={mqttUnSub} showUnsub={isSubed} />
        <Publisher publish={mqttPublish} />
      </QosOption.Provider>
      {/* <Receiver payload={payload} /> */}
      <Receiver></Receiver>
    </>
  );
};

export default HookMqtt;
