import axios from "axios";
const BASE_URl = "https://auth-refresh.onrender.com";

export default axios.create({
  baseURL: BASE_URl,
});

export const priveteAxios = axios.create({
  baseURL: BASE_URl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
