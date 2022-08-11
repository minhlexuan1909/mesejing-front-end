import axiosInstance from "../../../services/axios/axiosInstance";

const bearerOption = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

const RoomAPI = {
  sendMessage: (data) => {
    const url = "api/v1/messages/text";
    return axiosInstance.post(url, data);
  },
  createRoom: (data, token) => {
    const url = "api/v1/rooms";
    return axiosInstance.post(url, data, bearerOption(token));
  },
  getRooms: (token) => {
    const url = "api/v1/users/rooms";
    return axiosInstance.get(url, bearerOption(token));
  },
  getRoom: (room, token) => {
    const url = `api/v1/rooms/${room}`;
    return axiosInstance.get(url, bearerOption(token));
  },
  getUsersInRoom: (room, token) => {
    const url = `api/v1/rooms/${room}/users?limit=15`;
    return axiosInstance.get(url, bearerOption(token));
  },
  addUsers: (room, token, data) => {
    const url = `api/v1/rooms/${room}/users`;
    return axiosInstance.post(url, data, bearerOption(token));
  },
  deleteUser: (room, user, token) => {
    const url = `api/v1/rooms/${room}/users/${user}`;
    return axiosInstance.delete(url, bearerOption(token));
  },
  getUsersStatus: (room, token) => {
    const url = `api/v1/rooms/${room}/users/status`;
    return axiosInstance.get(url, bearerOption(token));
  },
  setNameOfRoom: (room, name, token) => {
    const url = `api/v1/rooms/${room}/name`;
    return axiosInstance.patch(url, { name: name }, bearerOption(token));
  },
  setAvatarOfRoom: (room, avatar, token) => {
    const url = `api/v1/rooms/${room}/avatar`;
    return axiosInstance.patch(url, {avatar: avatar}, bearerOption(token))
  },
  leaveRoom: (room, token) => {
    const url = `api/v1/rooms/${room}/users`;
    return axiosInstance.delete(url, bearerOption(token));
  },
  updateLastSeenMessage: (room, token) => {
    const url = `api/v1/rooms/${room}/update-last-seen-message`;
    return axiosInstance.patch(url, {}, bearerOption(token));
  },
};

export default RoomAPI;
