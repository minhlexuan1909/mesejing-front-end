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
  isGettingUserProfileSelector,
  isShowOwnProfileSelector,
  lastNameProfileSelector,
  selectedUserProfileSelector,
  selectedUserSelector,
} from "../../../../profile/services/userProfile/userProfileSlice";
import {
  tokenSelector,
  userIdSelector,
} from "../../../../auth/services/authSlice";
import { getUserByIdThunk } from "../../../../profile/services/userProfile/userProfileThunk";
import Shimmer from "react-shimmer-effect";

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
  const selectedUser = useSelector(selectedUserProfileSelector);

  const isGettingUserProfile = useSelector(isGettingUserProfileSelector);
  // Tam lay userId cua minh de test, phan nay can duoc thay bang id cua profile can lay
  const userId = useSelector(userIdSelector);
  useEffect(() => {
    dispatch(getUserByIdThunk({ token, selectedUser }));
  }, [selectedUser, token, dispatch]);

  return (
    <div>
      <Modal
        wrapClassName="modalFriendProfile"
        visible={isFriendProfileVisible}
        title="Th??ng tin"
        centered
        // onCancel={() => setFriendProfileVisible(false)}
        onCancel={() => dispatch(friendAction.setIsFriendProfileVisible(false))}
        width={320}
        height={600}
        bodyStyle={{
          padding: "0",
        }}
        footer={[
          <div className="profile_actions-footer">
            <div className="actions_footer-btn">
              <div className="actions_footer-icon">
                {isGettingUserProfile ? (
                  <Shimmer>
                    <div style={{ height: "20px", width: "20px" }}></div>
                  </Shimmer>
                ) : (
                  <FontAwesomeIcon icon={faTrashCan} />
                )}
              </div>
              <span>
                {isGettingUserProfile ? (
                  <Shimmer>
                    <div style={{ height: "10px", width: "30px" }}></div>
                  </Shimmer>
                ) : (
                  "Xo??"
                )}
              </span>
            </div>
          </div>,
        ]}
      >
        <div className="profile_photo">
          <div className="background_photo">
            {isGettingUserProfile ? (
              <Shimmer>
                <div
                  style={{
                    height: "180px",
                    width: "320px",
                    maxWidth: "calc(100vw - 17px)",
                  }}
                ></div>
              </Shimmer>
            ) : (
              <img
                src={`${process.env.REACT_APP_BASE_IMAGE_URL}${coverProfile}`}
                alt="background"
              ></img>
            )}
          </div>
          <div className="avatar_profile">
            {isGettingUserProfile ? (
              <Shimmer>
                <div
                  style={{
                    height: "96px",
                    width: "96px",
                    borderRadius: "50%",
                  }}
                ></div>
              </Shimmer>
            ) : (
              <img
                src={`${process.env.REACT_APP_BASE_IMAGE_URL}${avatarProfile}`}
                alt="avatar"
              ></img>
            )}
          </div>
        </div>
        <div className="profile_name">
          <span>
            {isGettingUserProfile ? (
              <Shimmer>
                <div style={{ height: "20px", width: "140px" }}></div>
              </Shimmer>
            ) : (
              <>{firstNameProfile + " " + lastNameProfile}</>
            )}
          </span>
          {/* <div className="edit-btn">
            <FontAwesomeIcon icon={faPenToSquare} />
          </div> */}
        </div>
        <div className="profile_actions">
          <div className="msg-btn">
            <span>Nh???n tin</span>
          </div>
        </div>
        <div className="profile_inf">
          {/* <div className="user-profile-details__line">
              <span>Nh??m chung</span>
              <span>2 nh??m chung</span>
          </div> */}
          {/* <div className="user-profile-details__line">
            <span>??i???n tho???i</span>
            <span>0976466331</span>
          </div> */}
          <div className="user-profile-details__line">
            <span>
              {isGettingUserProfile ? (
                <Shimmer>
                  <div style={{ height: "17px", width: "40px" }}></div>
                </Shimmer>
              ) : (
                "Email"
              )}
            </span>
            <span>
              {isGettingUserProfile ? (
                <Shimmer>
                  <div style={{ height: "17px", width: "110px" }}></div>
                </Shimmer>
              ) : (
                <>{emailProfile}</>
              )}
            </span>
          </div>
          <div className="user-profile-details__line">
            <span>
              {isGettingUserProfile ? (
                <Shimmer>
                  <div style={{ height: "17px", width: "90px" }}></div>
                </Shimmer>
              ) : (
                "Ng??y sinh"
              )}
            </span>
            <span>
              {isGettingUserProfile ? (
                <Shimmer>
                  <div style={{ height: "17px", width: "80px" }}></div>
                </Shimmer>
              ) : (
                <>{dateOfBirthProfile}</>
              )}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FriendProfile;
