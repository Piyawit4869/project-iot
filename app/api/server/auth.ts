import axios from "axios";
import { env } from "~/utils/common/env";

const baseURL = env.PUBLIC_API_URL;

export const getMe = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    console.error("getMe error:", error);
    throw error;
  }
};

export const login = async ({
  user,
  password,
}: {
  user: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${baseURL}/auth/signin`, {
      user,
      password,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
