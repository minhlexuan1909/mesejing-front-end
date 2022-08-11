import axiosInstance from "../../../services/axios/axiosInstance";

const bearerOption = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

const MessageAPI = {
  sendMessage: (data, token) => {
    const url = "api/v1/messages/text";
    return axiosInstance.post(url, data, bearerOption(token));
  },

  getMessageRoom: (token, roomID, page) => {
    // const url = `api/v1/messages/rooms/${roomID}?limit=${page}`;
    const url = `api/v1/messages/rooms/${roomID}?&page=${page}&limit=15`;
    return axiosInstance.get(url, bearerOption(token));
  }
};

export default MessageAPI;
