import axiosInstance from "../../../../services/axios/axiosInstance";

const bearerOption = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

const SelfProfileAPI = {
  getMe: (token) => {
    const url = "api/v1/users/me";
    return axiosInstance.get(url, bearerOption(token));
  },
  updateMyProfile:(token, data) => {
    const url = "api/v1/users/profile";
    return axiosInstance.put(url, data, bearerOption(token))
  }
};

export default SelfProfileAPI;
