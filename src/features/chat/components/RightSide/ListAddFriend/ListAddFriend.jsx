import React, { useEffect, useState } from "react";
import "./ListAddFriend.scss";
import { listFriendInqueuesSelector } from "../../../../profile/services/friend/friendSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalMyProfile from "../../../../profile/components/ModalMyProfile/ModalMyProfile";
import {
  acceptFriendThunk,
  rejectFriendThunk,
} from "../../../../profile/services/friend/friendThunk";
import { tokenSelector } from "../../../../auth/services/authSlice";

const ListAddFriend = () => {
  const dispatch = useDispatch();

  const listFriendInqueues = useSelector(listFriendInqueuesSelector);
  const token = useSelector(tokenSelector);
  const [listFriendInvite, setListFriendInvite] = useState([]);

  useEffect(() => {
    setListFriendInvite(
      listFriendInqueues.filter((user) => user.request === false)
    );
  }, [listFriendInqueues]);

  const handleOnClickRejectBtn = (friendId) => {
    dispatch(rejectFriendThunk({ friendId, token }));
  };

  const handleOnClickAcceptBtn = (friendId) => {
    dispatch(acceptFriendThunk({ friendId, token }));
  };

  return (
    <div className="listAddFriend-container">
      <div className="listAddFriend-header">
        <img
          src="https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png"
          alt="addFriend"
          className="icons-addFriend"
        />
        <span>Danh sách kết bạn</span>
      </div>
      <div className="listAddFriend">
        <div className="title">
          <span>Lời mời kết bạn ({listFriendInvite.length})</span>
        </div>
        {listFriendInvite.map((item) => {
          if (item.request === false)
            return (
              <div className="addFriend-item">
                <div className="inf-addFriend">
                  {/* <img src={item.avatar} alt="" /> */}
                  <img
                    src="https://s240-ava-talk.zadn.vn/2/5/6/3/1/240/3995d528ef83380fc0f09342f22071e7.jpg"
                    alt=""
                  />
                  <div className="inf-text">
                    <p>
                      {item.firstName} {item.lastName}
                    </p>
                    <span>
                      Xin chào, tôi là {item.firstName} {item.lastName}. Kết bạn
                      với mình nhé!!
                    </span>
                  </div>
                </div>
                <div className="addFriend-btn">
                  <div
                    className="btn-reject"
                    onClick={() => handleOnClickRejectBtn(item._id)}
                  >
                    Bỏ qua
                  </div>
                  <div
                    className="btn-accept"
                    onClick={() => handleOnClickAcceptBtn(item._id)}
                  >
                    Đồng ý
                  </div>
                </div>
              </div>
            );
        })}
      </div>
      <ModalMyProfile />
    </div>
  );
};

export default ListAddFriend;
