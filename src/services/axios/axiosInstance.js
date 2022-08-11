import axios from "axios";
import queryString from "query-string";

const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_BASE_API_URL,

  timeout: 5000,
  headers: {
    "Content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
console.log(process.env.REACT_APP_BASE_API_URL);

export default axiosInstance;
