import axios from "axios";
import { env } from "~/utils/common/env";

const AxiosInstance = axios.create({
  baseURL: env.PUBLIC_API_URL,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      if (config.headers) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const ApiConfig = AxiosInstance;
