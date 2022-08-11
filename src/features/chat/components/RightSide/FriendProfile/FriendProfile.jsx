import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";
import "./FriendProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  friendAction,
  isFriendProfileVisibleSelector,
} from "../../../../profile/services/friend/friendSlice";
import {
  avatarProfileSelector,
  coverProfileSelector,
  dateOfBirthProfileSelector,
  emailProfileSelector,
  firstNameProfileSelector,
  isShowOwnProfileSelector,
  lastNameProfileSelector,
  selectedUserSelector,
} from "../../../../profile/services/userProfile/userProfileSlice";
import {
  tokenSelector,
  userIdSelector,
} from "../../../../auth/services/authSlice";
import { getUserByIdThunk } from "../../../../profile/services/userProfile/userProfileThunk";

function FriendProfile({}) {
  const dispatch = useDispatch();

  const isFriendProfileVisible = useSelector(isFriendProfileVisibleSelector);
  const firstNameProfile = useSelector(firstNameProfileSelector);
  const lastNameProfile = useSelector(lastNameProfileSelector);
  const emailProfile = useSelector(emailProfileSelector);
  const dateOfBirthProfile = useSelector(dateOfBirthProfileSelector);
  const avatarProfile = useSelector(avatarProfileSelector);
  const coverProfile = useSelector(coverProfileSelector);
  const token = useSelector(tokenSelector);
  // Tam lay userId cua minh de test, phan nay can duoc thay bang id cua profile can lay
  const userId = useSelector(userIdSelector);
  // useEffect(() => {
  //   dispatch(getUserByIdThunk({ token, userId }));
  // }, [userId, token, dispatch]);
  //

  return (
    <div className="modalFriendProfile">
      <Modal
        visible={isFriendProfileVisible}
        title="Thông tin"
        centered
        // onCancel={() => setFriendProfileVisible(false)}
        onCancel={() => dispatch(friendAction.setIsFriendProfileVisible(false))}
        width={360}
        height={600}
        footer={[
        
          <div className="profile_actions-footer">
            {/* <div className="actions_footer-btn">
            <div className="actions_footer-icon">
                <FontAwesomeIcon icon={faAddressCard} />
            </div>
            <span>Chia sẻ</span>
        </div> */}
            <div className="actions_footer-btn">
              <div className="actions_footer-icon">
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
              <span>Xoá</span>
            </div>
            {/* <div className="actions_footer-btn">
            <div className="actions_footer-icon">
                <FontAwesomeIcon icon={faLock} />
            </div>
            <span>Chặn</span>
        </div>
        <div className="actions_footer-btn">
            <div className="actions_footer-icon">
                <FontAwesomeIcon icon={faTriangleExclamation} />
            </div>
            <span>Báo cáo</span>
        </div> */}
          </div>,
        ]}
      >
        <div className="profile_photo">
          <div className="background_photo">
            <img
              src={`${process.env.REACT_APP_BASE_IMAGE_URL}${coverProfile}`}
              alt="background"
            ></img>
          </div>
          <div className="avatar_profile">
            <img
              src={`${process.env.REACT_APP_BASE_IMAGE_URL}${avatarProfile}`}
              alt="avatar"
            ></img>
          </div>
        </div>
        <div className="profile_name">
          <span>{firstNameProfile + " " + lastNameProfile}</span>
          <div className="edit-btn">
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
        <div className="profile_actions">
          <div className="msg-btn">
            <span>Nhắn tin</span>
          </div>
        </div>
        <div className="profile_inf">
          {/* <div className="user-profile-details__line">
              <span>Nhóm chung</span>
              <span>2 nhóm chung</span>
          </div> */}
          <div className="user-profile-details__line">
            <span>Điện thoại</span>
            <span>0976466331</span>
          </div>
          <div className="user-profile-details__line">
            <span>Giới tính</span>
            <span>Nam</span>
          </div>
          <div className="user-profile-details__line">
            <span>Ngày sinh</span>
            <span>{dateOfBirthProfile}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FriendProfile;
