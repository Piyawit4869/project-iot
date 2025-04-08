import axios from "axios";
import { env } from "@/constants/common";

import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

const AxiosInstance = axios.create({
  baseURL: env.base_url,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession(authOptions);

    const accessToken = (session?.user as { auth: { accessToken: string } })
      ?.auth?.accessToken;

    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiAxiosClient = AxiosInstance;
