"use server";
import { ApiConfig } from "~/api/config";
import type {
  AskQuestionValues,
  PushMessageValues,
  UpdateStatusProgressTagPayLoad,
} from "~/schemas/message/message";

export const fetchLineBundleConfig = async (branchId: string) => {
  try {
    const res = await ApiConfig.get(
      `/thirdparty/line/config/bundle/branch/${branchId}`
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchAskQuestion = async (payload: AskQuestionValues) => {
  try {
    const res = await ApiConfig.post(
      `/thridparty/openai/generate/message`,
      payload
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchAllRoomChat = async () => {
  try {
    const res = await ApiConfig.get(`/crud/chats/rooms`);

    return res.data.res;
  } catch (error) {
    return error;
  }
};

export const fetchSendMessage = async (payload: PushMessageValues) => {
  try {
    const res = await ApiConfig.post(`/chats/push-message`, payload);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const markAsProcess = async (chatRoomId: string, isProcess: boolean) => {
  try {
    const res = await ApiConfig.put(
      `/crud/chats/rooms/${chatRoomId}/mark-is-process`,
      { isProcess }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const markAsDone = async (chatRoomId: string, done: boolean) => {
  try {
    const res = await ApiConfig.put(
      `/crud/chats/rooms/${chatRoomId}/mark-as-done`,
      { done }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};
export const markAsSpam = async (chatRoomId: string, isSpam: boolean) => {
  try {
    const res = await ApiConfig.put(
      `/crud/chats/rooms/${chatRoomId}/mark-as-spam`,
      { isSpam }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateStatusProgressTag = async (
  chatRoomId: string,
  payload: UpdateStatusProgressTagPayLoad
) => {
  try {
    const res = await ApiConfig.put(
      `/crud/chats/rooms/${chatRoomId}/mark-process-tag`,
      payload
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllMessageWithRoomId = async (
  roomId: string,
  offset?: string | number | undefined | null,
  limit = 20
) => {
  const res = await ApiConfig.get(`/chats/${roomId}/messages`, {
    params: { offset, limit },
  });

  return res.data;
};

export const fetchAllMessageCursorWithRoomId = async (
  roomId: string,
  currentId?: string | null,
  limit = 20,
  direction = ""
) => {
  const res = await ApiConfig.get(`/chats/${roomId}/messages/cursor`, {
    params: { currentId, limit, direction },
  });

  return res.data;
};

export const fetchSearchByKeyword = async (roomId: string, keyword: string) => {
  const res = await ApiConfig.get(`/chats/${roomId}/search-by-keyword`, {
    params: { keyword },
  });
  return res.data;
};

export const fetchRoomChatLoadMore = async (
  offset = 0,
  limit = 20,
  name: string,
  topic: string
) => {
  const search = Object.assign({});

  if (name) {
    search.name = name;
  }

  if (topic) {
    search.topic = topic;
  }

  try {
    const res = await ApiConfig.get(`/crud/chats/rooms`, {
      params: { offset, limit, ...search },
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchRoomChatAILoadMore = async (
  chatRoomId: string,
  offset = 0,
  limit = 10
) => {
  try {
    const res = await ApiConfig.get(`/chats/${chatRoomId}/messages`, {
      params: { offset, limit, type: "assistant" },
    });

    return res.data;
  } catch (error) {
    return error;
  }
};
