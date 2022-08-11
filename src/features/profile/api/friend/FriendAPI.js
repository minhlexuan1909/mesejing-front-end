import axiosInstance from "../../../../services/axios/axiosInstance";

const bearerOption = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

const FriendAPI = {
  getListFriended: (token) => {
    const url = "api/v1/users/friends/friendeds";
    return axiosInstance.get(url, bearerOption(token));
  },
  requestFriend: (token, friendId) => {
    const url = `api/v1/users/friends/request/${friendId}`;
    return axiosInstance.get(url, bearerOption(token));
  },
  acceptFriend: (token, friendId) => {
    const url = `api/v1/users/friends/accept/${friendId}`;
    console.log(token);
    return axiosInstance.patch(url, {}, bearerOption(token));
  },
  rejectFriend: (token, friendId) => {
    const url = `api/v1/users/friends/reject/${friendId}`;
    return axiosInstance.delete(url, bearerOption(token));
  },
  unfriend: (token, friendId) => {
    const url = `api/v1/users/friends/unfriend/${friendId}`;
    return axiosInstance.delete(url, bearerOption(token));
  },
  getListRequestInQueue: (token) => {
    const url = "api/v1/users/friends/inqueues";
    return axiosInstance.get(url, bearerOption(token));
  },
  getListFriendsJoinRoom: (roomID, token) => {
    const url = `api/v1/users/rooms/${roomID}/friends`;
    return axiosInstance.get(url, bearerOption(token));
  },
};

export default FriendAPI;
