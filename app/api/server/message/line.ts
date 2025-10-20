import axios from "axios";
import { ApiConfig } from "~/api/config";
import { env } from "~/utils/common/env";

const baseURL = env.PUBLIC_API_URL;

export const getLineCardMessagePaginate = async (token: string) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/thirdparty/line/content-reply/paginate`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getLineDetail = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/thridparty/line/contents/${id}`);

    return res.data;
  } catch (error) {
    return error;
  }
};

//reply message
