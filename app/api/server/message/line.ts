import axios from "axios";
import { ApiConfig } from "~/api/config";
import type { TeamMessageCreateDTO } from "~/schemas/settings";
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

export const createReplyMessage = async (payload: TeamMessageCreateDTO) => {
  try {
    const res = await ApiConfig.post(
      `/thirdparty/line/contents/created`,
      payload
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const sendCardContent = async (id: string, payload: { to?: string }) => {
  try {
    const res = await ApiConfig.post(
      `/thirdparty/line/content/push-to-line/${id}`,
      payload
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateReplyMessage = async (
  id: string,
  payload: TeamMessageCreateDTO
) => {
  try {
    const res = await ApiConfig.put(
      `/thirdparty/line/contents/${id}/edit`,
      payload
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getReplyMessage = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/thirdparty/line/contents/${id}`);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const markFavoriteReplyMessage = async (id: string) => {
  try {
    const res = await ApiConfig.post(
      `/thirdparty/line/contents/${id}/favorite`
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

// FIXME: wait for full api with sticker list.
export const getAllLineSticker = async () => {
  const res = await ApiConfig.get(`/chat-stickers`);
  return res.data;
};
