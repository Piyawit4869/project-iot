import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import {
  fetchAllMessageCursorWithRoomId,
  fetchAllMessageWithRoomId,
  fetchAllRoomChat,
  fetchAskQuestion,
  fetchLineBundleConfig,
  fetchRoomChatAILoadMore,
  fetchRoomChatLoadMore,
  fetchSearchByKeyword,
  fetchSendMessage,
  fetchUpdateStatusProgressTag,
  markAsDone,
  markAsProcess,
} from "~/api/server/message/message";

import type {
  AskQuestionValues,
  PushMessageValues,
  UpdateStatusProgressTagPayLoad,
} from "~/schemas/message/message";

//api/thirdparty/line/config/bundle/branch/
export const useLineBundleConfig = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["line-bunddle-config"],
    queryFn: () => fetchLineBundleConfig(id),
    enabled,
  });
};

export const useAskQuestion = () => {
  return useMutation({
    mutationFn: (values: AskQuestionValues) => fetchAskQuestion(values),
  });
};

export const useMarkAsProcess = (id: string) => {
  return useMutation({
    mutationFn: (isProcess: boolean) => markAsProcess(id, isProcess),
  });
};

export const useMarkAsDone = (id: string) => {
  return useMutation({
    mutationFn: (done: boolean) => markAsDone(id, done),
  });
};

export const useUpdateStatusProgressTag = (id: string) => {
  return useMutation({
    mutationFn: (payload: UpdateStatusProgressTagPayLoad) =>
      fetchUpdateStatusProgressTag(id, payload),
  });
};

export const useAllRoomChat = () => {
  return useQuery({
    queryKey: ["roomChat"],
    queryFn: () => fetchAllRoomChat(),
    enabled: true,
  });
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (payload: PushMessageValues) => {
      return fetchSendMessage(payload);
    },
  });
};

export const useAllMessageWithRoomId = (id: string) => {
  return useQuery({
    queryKey: ["messages", id],
    queryFn: () => fetchAllMessageWithRoomId(id),
    enabled: !!id,
  });
};

export const usePaginatedMessages = (roomId: string, jumpOffset = 0) => {
  const limit = 10;

  return useInfiniteQuery({
    queryKey: ["messages", roomId],
    queryFn: async ({ pageParam = jumpOffset }) => {
      return fetchAllMessageWithRoomId(roomId, pageParam, limit);
    },
    initialPageParam: jumpOffset ?? "",
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.meta;
      if (!meta?.hasMore) return undefined;
      return meta.offset + meta.limit;
    },
    enabled: !!roomId,
  });
};

export const usePaginatedMessagesCursor = (
  roomId: string,
  currentId = "",
  direction?: string //"none" : "before" : "after"
) => {
  const limit = 20;

  return useInfiniteQuery({
    queryKey: ["messages-cursor", roomId, currentId],
    queryFn: async ({ pageParam = currentId }) => {
      console.log({ currentId, pageParam });

      return fetchAllMessageCursorWithRoomId(
        roomId,
        pageParam,
        limit,
        // currentId ? "none" : "before"
        direction ? direction : "none"
      );
    },
    initialPageParam: currentId ?? "",
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.meta;

      if (!meta?.before) return undefined;
      return direction === "after" ? meta.after : meta.before;
    },
    enabled: !!roomId,
  });
};

export const useSearchByKeyWord = (id: string, keyword: string) => {
  return useQuery({
    queryKey: ["search-by-keyword", id, keyword],
    queryFn: () => fetchSearchByKeyword(id, keyword),
    enabled: !!id && !!keyword,
  });
};

export const usePaginatedChatRooms = (name = "", topic = "") => {
  return useInfiniteQuery({
    queryKey: ["roomChat", name, topic],
    queryFn: async ({ pageParam }) => {
      return fetchRoomChatLoadMore(pageParam, 20, name, topic);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.meta;

      return meta?.hasMore ? meta.offset + meta?.limit : undefined;
    },
  });
};

export const usePaginatedChatRoomAI = (chatRoomId: string) => {
  return useInfiniteQuery({
    queryKey: ["roomChat-ai", chatRoomId],
    queryFn: async ({ pageParam }) => {
      return fetchRoomChatAILoadMore(chatRoomId, pageParam, 10);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.meta;

      return meta?.hasMore ? meta.offset + meta.limit : undefined;
    },
    enabled: !!chatRoomId,
  });
};
