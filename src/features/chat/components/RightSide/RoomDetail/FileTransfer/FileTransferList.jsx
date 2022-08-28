import React from "react";
import "./FileTransferList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "antd";
import { useState } from "react";
import FileImg from "./file.png";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const FileTransferList = ({ setMODE_VIEW }) => {
  const { TabPane } = Tabs;
  const [listFile, setListFile] = useState([]);

  const handleUpLoadFile = (e) => {
    if (e.target.files.length === 0) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        let tmpFile = e.target.files[0];
        console.log(typeof tmpFile.size);
        setListFile([
          ...listFile,
          {
            name: tmpFile.name,
            size: Math.round((tmpFile.size * 100) / (1024 * 1024)) / 100,
          },
        ]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="feature-room_container">
      <div className="feature-room_header">
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => setMODE_VIEW(1)} />
        <span>Image/File store</span>
      </div>
      <div className="files_tab">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Image" key="1">
            <div className="listImage_wrapper">
              <Zoom zoomMargin={30}>
                <img
                  width="100"
                  src="https://vtv1.mediacdn.vn/thumb_w/1000/2022/4/26/johnny-depp-trial-1650959633428176204555.jpg"
                  alt="test"
                ></img>
              </Zoom>
              <Zoom zoomMargin={30}>
                <img
                  width="100"
                  src="https://vtv1.mediacdn.vn/thumb_w/1000/2022/4/26/johnny-depp-trial-1650959633428176204555.jpg"
                  alt="test"
                ></img>
              </Zoom>
              <Zoom zoomMargin={30}>
                <img
                  width="100"
                  src="https://vtv1.mediacdn.vn/thumb_w/1000/2022/4/26/johnny-depp-trial-1650959633428176204555.jpg"
                  alt="test"
                ></img>
              </Zoom>
              <Zoom zoomMargin={30}>
                <img
                  width="100"
                  src="https://vtv1.mediacdn.vn/thumb_w/1000/2022/4/26/johnny-depp-trial-1650959633428176204555.jpg"
                  alt="test"
                ></img>
              </Zoom>
              <Zoom zoomMargin={30}>
                <img
                  width="100"
                  src="https://vtv1.mediacdn.vn/thumb_w/1000/2022/4/26/johnny-depp-trial-1650959633428176204555.jpg"
                  alt="test"
                ></img>
              </Zoom>
              <Zoom zoomMargin={30}>
                <img
                  width="100"
                  src="https://vtv1.mediacdn.vn/thumb_w/1000/2022/4/26/johnny-depp-trial-1650959633428176204555.jpg"
                  alt="test"
                ></img>
              </Zoom>
              <Zoom zoomMargin={30}>
                <img
                  width="100"
                  src="https://vtv1.mediacdn.vn/thumb_w/1000/2022/4/26/johnny-depp-trial-1650959633428176204555.jpg"
                  alt="test"
                ></img>
              </Zoom>
            </div>
          </TabPane>
          <TabPane tab="File" key="2">
            <div className="listFile_wrapper">
              <input type="file" onChange={handleUpLoadFile}></input>
              {listFile.map((item) => {
                return (
                  <div className="fileItem">
                    <img src={FileImg} alt="File"></img>
                    <div className="fileInf">
                      <span style={{ "font-weight": "600" }}>{item.name}</span>
                      <span>{item.size} MB</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default FileTransferList;
