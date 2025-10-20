import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import {
  fetchAllMessageWithRoomId,
  fetchAllRoomChat,
  fetchAskQuestion,
  fetchRoomChatAILoadMore,
  fetchRoomChatLoadMore,
  fetchSendMessage,
  markAsDone,
  markAsProcess,
} from "~/api/server/message/message";

import type {
  AskQuestionValues,
  PushMessageValues,
} from "~/schemas/message/message";

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

export const usePaginatedMessages = (roomId: string) => {
  return useInfiniteQuery({
    queryKey: ["messages", roomId],
    queryFn: async ({ pageParam }) => {
      return fetchAllMessageWithRoomId(roomId, pageParam, 10);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.meta;
      return meta?.hasMore ? meta.offset + meta.limit : undefined;
    },
    enabled: !!roomId,
  });
};

export const usePaginatedChatRooms = () => {
  return useInfiniteQuery({
    queryKey: ["roomChat"],
    queryFn: async ({ pageParam }) => {
      return fetchRoomChatLoadMore(pageParam, 20);
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
