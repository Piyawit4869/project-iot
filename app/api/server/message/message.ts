"use server";
import { ApiConfig } from "~/api/config";
import type {
  AskQuestionValues,
  PushMessageValues,
} from "~/schemas/message/message";

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

export const fetchAllMessageWithRoomId = async (
  roomId: string,
  offset = 0,
  limit = 20
) => {
  const res = await ApiConfig.get(`/chats/${roomId}/messages`, {
    params: { offset, limit },
  });
  return res.data;
};

export const fetchRoomChatLoadMore = async (offset = 0, limit = 20) => {
  try {
    const res = await ApiConfig.get(`/crud/chats/rooms`, {
      params: { offset, limit },
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
