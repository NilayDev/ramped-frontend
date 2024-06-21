import axios from "axios";

const mode = process.env.NODE_ENV;

export const axiosClient = axios.create({
  baseURL:
    mode === "development"
      ? process.env.REACT_APP_DEV_API_URL
      : process.env.REACT_APP_DEV_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
