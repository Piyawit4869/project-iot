import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import {
  fetchAllMessageWithRoomId,
  fetchAllRoomChat,
  fetchAskQuestion,
  fetchLineBundleConfig,
  fetchRoomChatAILoadMore,
  fetchRoomChatLoadMore,
  fetchSearchByKeyword,
  fetchSendMessage,
  markAsDone,
  markAsProcess,
} from "~/api/server/message/message";

import type {
  AskQuestionValues,
  PushMessageValues,
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

export const usePaginatedMessages = (roomId: string, jumpOffset?: number) => {
  const windowSize = 10;
  const startOffset =
    jumpOffset != null
      ? Math.max(0, jumpOffset - Math.floor(windowSize / 2))
      : 0;
  return useInfiniteQuery({
    queryKey: ["messages", roomId, jumpOffset],
    // queryFn: async ({ pageParam }) => {
    //   const offsetResult = offset ? offset : pageParam;

    //   const limitResult = offset ? offset + 10 : 10;

    //   return fetchAllMessageWithRoomId(roomId, offsetResult, limitResult);
    // },

    queryFn: async (p) => {
      console.log({ p });
      const offset =
        typeof p.pageParam === "number" ? p.pageParam : startOffset;
      const limit = windowSize;
      return fetchAllMessageWithRoomId(roomId, startOffset, limit);
    },
    initialPageParam: startOffset ?? 0,
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.meta;
      return meta?.hasMore ? meta.offset + meta.limit : undefined;
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

export const usePaginatedChatRooms = (name = "") => {
  return useInfiniteQuery({
    queryKey: ["roomChat", name],
    queryFn: async ({ pageParam }) => {
      return fetchRoomChatLoadMore(pageParam, 20, name);
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
