import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase.init";

export const axiosPrivate = axios.create({
  // baseURL: 'https://mongoosetest-production.up.railway.app'
  baseURL: "http://192.168.1.105:3000",
});

axiosPrivate.interceptors.request.use(
  function (config) {
    if (!config.headers.authorization) {
      config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403 || error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);
