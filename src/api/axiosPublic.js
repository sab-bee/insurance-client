import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://mongoosetest-production.up.railway.app",
  // baseURL: "http://192.168.1.105:3000",
});
