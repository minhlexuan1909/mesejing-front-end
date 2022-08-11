import "./ModalUploadImage.scss";

import { Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { tokenSelector } from "../../../auth/services/authSlice";

const ModalUploadImage = ({
  isUploadImage,
  setIsUploadImage,
  fmData,
  setFmData,
}) => {
  const token = useSelector(tokenSelector);

  const [fileList, setFileList] = useState([]);
  const [isImagePicked, setIsImagePicked] = useState(false);

  const onModalOk = () => {
    console.log("oke");
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    console.log("Abc");
    let src = file.url;
    console.log(src);
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    console.log(src);
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onRemove = () => {
    console.log("remove");
  };

  useEffect(() => {
    if (fileList.length) {
      setIsImagePicked(true);
    } else setIsImagePicked(false);
  }, [fileList.length]);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    console.log(options);
    console.log(onSuccess);
    // onSuccess
    const fmData = new FormData();

    fmData.append("image", file);
    setFmData(fmData);
    onSuccess();
    // const str = URL.createObjectURL(file);
    // console.log(str);
    // console.log(fmData);
    // console.log(file);
    // console.log(str);
    // console.log(fmData);
    // try {
    //   const res = await axios.post(
    //     "https://upload.imagekit.io/api/v1/files/upload",
    //     fmData
    //   );
    //   const jsonRes = res.json();
    //   console.log(jsonRes);
    // } catch (err) {
    //   console.log(err);
    // }
    //   const config = {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
    //   try {
    //     const res = await axios.post(
    //       `${process.env.REACT_APP_BASE_IMAGE_URL}upload`,
    //       fmData,
    //       config
    //     );

    //     onSuccess("Ok");
    //     console.log("server res: ", res);
    //   } catch (err) {
    //     console.log("Eroor: ", err);
    //     const error = new Error("Some error");
    //     onError({ err });
    //   }
  };
  const handleUploadOnCancel = () => {
    setIsUploadImage(false);
    setFmData("default");
    setFileList([]);
  };
  const handleUploadOnOk = () => {
    setIsUploadImage(false);
  };
  return (
    <div className="modal-upload-image">
      <Modal
        visible={isUploadImage}
        closable="false"
        // footer={null}
        okText="Xác nhận"
        cancelText="Hủy"
        centered
        onOk={handleUploadOnOk}
        onCancel={handleUploadOnCancel}
        title="Upload ảnh"
        bodyStyle={{ width: "300px", height: "300px" }}
        style={{ width: "fit-content" }}
        width
      >
        <div className="modal-upload-container">
          <ImgCrop shape="round" rotate onModalOk={onModalOk}>
            <Upload
              // // POST URL
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              // customRequest={console.log("Hello")}
              customRequest={uploadImage}
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              onRemove={onRemove}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </ImgCrop>
          {isImagePicked ? (
            <div className="preview-after"></div>
          ) : (
            <div className="preview-before"></div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ModalUploadImage;
