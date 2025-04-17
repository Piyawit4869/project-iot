import { env } from "@/constants/common";
import { apiAxios } from "@/utils/axiosInterceptor";
import axios from "axios";

export const fetchMe = async () => {
  try {
    const res = await apiAxios.get("/auth/me");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUpload = async (
  formData: FormData,
  accessToken: string | undefined
) => {
  try {
    const res = await axios.post(`${env.base_url}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
