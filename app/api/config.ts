import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  // withCredentials: true, // ส่ง cookie HttpOnly ไปกับทุก request
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
