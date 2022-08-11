import axiosInstance from "../../../services/axios/axiosInstance";

const bearerOption = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

const AuthAPI = {
  login: (data) => {
    const url = "api/v1/auth/login";
    return axiosInstance.post(url, data);
  },
  register: (data) => {
    const url = "api/v1/auth/register";
    return axiosInstance.post(url, data);
  },
  confirmEmail: (data) => {
    const url = "api/v1/auth/confirm-email";
    return axiosInstance.post(url, data);
  },
  resendOtpEmail: (data) => {
    const url = "api/v1/auth/otp";
    return axiosInstance.post(url, data);
  },
  forgotPassword: (data) => {
    const url = "api/v1/auth/forgot-password";
    return axiosInstance.post(url, data);
  },
  confirmEmailPassword: (data) => {
    const url = "api/v1/auth/confirm-email-password";
    return axiosInstance.post(url, data);
  },
  resendOtpPassword: (data) => {
    const url = "api/v1/auth/resend-otp-password";
    return axiosInstance.post(url, data);
  },
  resendOtpPassword: (data) => {
    const url = "api/v1/auth/otp-password";
    return axiosInstance.post(url, data);
  },
  resetPassword: (data) => {
    const url = "api/v1/auth/reset-password";
    return axiosInstance.post(url, data);
  },
  getMe: (token) => {
    const url = "api/v1/users/me";
    return axiosInstance.get(url, bearerOption(token));
  },
};

export default AuthAPI;
