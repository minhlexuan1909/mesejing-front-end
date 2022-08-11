import axiosInstance from "../../../../services/axios/axiosInstance";

const bearerOption = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

const UserProfileAPI = {
  getUserById: (token, userId) => {
    const url = `api/v1/users/profile/${userId}`;
    return axiosInstance.get(url, bearerOption(token));
  },
  searchUser: (keyword, page, token) => {
    const url = `api/v1/users/search?q=${keyword}&page=${page}&limit=6`;
    return axiosInstance.get(url, bearerOption(token));
  },
};

export default UserProfileAPI;
