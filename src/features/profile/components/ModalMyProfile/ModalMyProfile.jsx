import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./ModalMyProfile.scss";
import { Input, DatePicker } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  avatarProfileSelector,
  dateOfBirthProfileSelector,
  emailProfileSelector,
  firstNameProfileSelector,
  isShowOwnProfileSelector,
  lastNameProfileSelector,
  userNameProfileSelector,
  selfProfileAction,
  userProfileAction,
  backGroundImgSelector
} from "../../services/selfProfile/selfProfileSlice";
import {
  tokenSelector,
  userIdSelector,
} from "../../../auth/services/authSlice";
import { updateMyProfileThunk } from "../../services/selfProfile/selfProfileThunk";
import moment from "moment";
import axios from "axios";


function ModalMyProfile(props) {
  const dispatch = useDispatch();

  // SELECTOR
  const isShowOwnProfile = useSelector(isShowOwnProfileSelector);
  const firstNameProfile = useSelector(firstNameProfileSelector);
  const lastNameProfile = useSelector(lastNameProfileSelector);
  const emailProfile = useSelector(emailProfileSelector);
  const dateOfBirthProfile = useSelector(dateOfBirthProfileSelector);
  const avatarProfie = useSelector(avatarProfileSelector);
  const backgroundProfile = useSelector(backGroundImgSelector);
  const userNameProfile = useSelector(userNameProfileSelector);
  const token = useSelector(tokenSelector);
  const userId = useSelector(userIdSelector);

  //STATE

  const [dob, setDob] = useState('');
  const [nameUser, setNameUser] = useState('')
  const [avatarImg, setAvatarImg] = useState(`${process.env.REACT_APP_BASE_IMAGE_URL}${avatarProfie}`.replaceAll(" ", "-"));
  const [backgroundImg, setBackGroundImg] = useState(`${process.env.REACT_APP_BASE_IMAGE_URL}${backgroundProfile}`.replaceAll(" ", "-"))
  const [listFile, setListFile] = useState(["default", "default"]);

  useEffect(() => {
    setDob(dateOfBirthProfile);
    setNameUser(`${firstNameProfile} ${lastNameProfile}`);
  }, [isShowOwnProfile])

  const handleUpdateProfile = async () => {
    let firstName = nameUser.trim().split(' ')[0];
    let lastName = ''; 
    nameUser.trim().split(' ').forEach((item, index) => {
      if (index > 0) {
        lastName += item + " ";
      }
    })
    // console.log(uploadImage(listFile[0]));
    // console.log(uploadImage(listFile[1]));
    // console.log(listFile);
    // console.log(uploadImage(listFile[0]), uploadImage(listFile[1]));
    console.log(listFile);
    let upLoadImg1 = await uploadImage(listFile[0]);
    let upLoadImg2 = await uploadImage(listFile[1]);
    console.log(upLoadImg1, upLoadImg2);
    // let data = {
    //   "username": userNameProfile,
    //   "firstName": firstName,
    //   "lastName": lastName,
    //   "avatar":"path avatar",
    //   "cover":"path cover"
    // }
    console.log(upLoadImg1, upLoadImg2);
    dispatch(updateMyProfileThunk({token, username: userNameProfile, firstName: 
      firstName,lastName: lastName, avatar: upLoadImg1, cover: upLoadImg2}));
  }

  const handleUpdateAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarImg(reader.result);
        }
    }
    reader.readAsDataURL(e.target.files[0]);
    let tmp = listFile;
    tmp[0] = e.target.files[0];
    setListFile(tmp);
    // console.log(uploadImage(e.target.files[0]));
  }

  const handleUpdateBackGround = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
        if (reader.readyState === 2) {
          setBackGroundImg(reader.result);
        }
    }
    reader.readAsDataURL(e.target.files[0]);
    let tmp = listFile;
    tmp[1] = e.target.files[0];
    setListFile(tmp);
    // console.log(uploadImage(e.target.files[0]));
  }

  const uploadImage = async (fileImg) => {
    let data = new FormData();
    data.append("image", fileImg);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_IMAGE_URL}upload`,
        data,
        config
      );
      // console.log("server res: ", res);
      return res.data.filename;
    } catch (err) {
      // console.log("Eroor: ", err);
    }
  };

  useEffect(() => {
    setAvatarImg(`${process.env.REACT_APP_BASE_IMAGE_URL}${avatarProfie}`.replaceAll(" ", "-"));
    setBackGroundImg(`${process.env.REACT_APP_BASE_IMAGE_URL}${backgroundProfile}`.replaceAll(" ", "-"));
  }, [token, dispatch, isShowOwnProfile])

  


  return (
    <div className="modalMyProfile">
      <Modal
        visible={isShowOwnProfile}
        title="Thông tin"
        centered
        width={360}
        footer={[
          <div className="myProfile-btn">
            <div className="btn-reject" onClick={() => dispatch(selfProfileAction.setIsShowOwnProfile(false))}>Huỷ</div>
            <div className="btn-accept" onClick={handleUpdateProfile}>Cập nhật</div>
          </div>,
        ]}
        onCancel={() => dispatch(selfProfileAction.setIsShowOwnProfile(false))}
      >
        <div className="profile_photo">
          <label className="background_photo" htmlFor="backImgUpdateMyProfile">
            <img
              // src="https://cover-talk.zadn.vn/b/4/4/c/9/d8b1bf93072087e093ed8d3c702b3dd6.jpg"
              src={backgroundImg}
              alt="background"
            ></img>
            <div className="camera-icons">
              <FontAwesomeIcon icon={faCamera} />
            </div>
            <input
              id="backImgUpdateMyProfile"
              type="file"
              accept="image/*"
              alt="ava"
              style={{ display: "none" }}
              onChange={handleUpdateBackGround}
            />
          </label>
          <label className="avatar_profile" htmlFor="avaUpdateMyProfile">
            <img
              src={avatarImg}
              alt="avatar"
            ></img>
            <div className="camera-icons">
              <FontAwesomeIcon icon={faCamera} />
            </div>
            <input
              id="avaUpdateMyProfile"
              type="file"
              accept="image/*"
              alt="ava"
              style={{ display: "none" }}
              onChange={handleUpdateAvatar}
            />
          </label>
        </div>
        <div className="inf-myProfile">
          {/* <div className="inf-item">
            <span>User Name</span>
            <Input value="Le Thanh Binh" disabled />
          </div> */}
          <div className="inf-item">
            <span>Tên hiển thị</span>
            <Input value={nameUser} onChange={(e) => {setNameUser(e.target.value)}}/>
          </div>
          <div className="inf-item">
            <span>Email</span>
            <Input type="email" value={emailProfile} disabled />
          </div>
          <div className="inf-item">
            <span>Ngày sinh</span>
            <DatePicker
              allowClear={false}
              value={moment(dob, ["DD-MM-YYYY", "YYYY-MM-DD"])}
              format="DD-MM-YYYY"
              style={{ cursor: "pointer" }}
              onChange={(date) => {setDob(date)}}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalMyProfile;
