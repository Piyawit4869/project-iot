import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  fetchBranchPagination,
  fetchChatBotPagination,
  fetchGetConnectionAi,
  fetchGetConnectionLine,
  fetchGetOrganizations,
  fetchRoomChatAILoadMore,
  fetchRoomChatLoadMore,
  fetchSendMessage,
  fetchUpdateConnectionAi,
  fetchUpdateConnectionLine,
  fetchUpdateOrganization,
  fetchUpdateSetting,
  fetchUpdateSettingAddress,
} from "../server/settings";
import type {
  AddressSchemaValues,
  ConnectAiValues,
  ConnectLineValues,
  OrganizationFormValues,
  PushMessageValues,
  SettingSchemaValues,
} from "~/schemas/settings";

export const useGetOrganizations = () =>
  useQuery({
    queryKey: ["organization"],
    queryFn: () => fetchGetOrganizations(),
  });

export const useUpdateOrganization = (
  organizationId: string,
  userId: string
) => {
  return useMutation({
    mutationFn: (values: OrganizationFormValues) =>
      fetchUpdateOrganization(organizationId, values, userId),
  });
};

export const useUpdateAddress = (settingAddressId: string, userId: string) => {
  return useMutation({
    mutationFn: (values: AddressSchemaValues) =>
      fetchUpdateSettingAddress(values),
  });
};

export const useUpdateSettings = (settingId: string, userId: string) => {
  return useMutation({
    mutationFn: (values: SettingSchemaValues) => fetchUpdateSetting(values),
  });
};

export const usePaginateBranch = ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["paginate", pageIndex, pageSize],
    queryFn: () => fetchBranchPagination({ page: pageIndex, limit: pageSize }),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize,
  });
};

export const usePaginateChatBot = ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["chatbot.paginate", pageIndex, pageSize],
    queryFn: () => fetchChatBotPagination({ page: pageIndex, limit: pageSize }),

    select: (res: any) => {
      if (Array.isArray(res)) return res;
      if (Array.isArray(res?.items)) return res.items;
      if (Array.isArray(res?.data)) return res.data;
      return [];
    },

    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize,
  });
};

export const useUpdateConnectionLine = (id: string) => {
  return useMutation({
    mutationFn: (values: ConnectLineValues) =>
      fetchUpdateConnectionLine(id, values),
  });
};

export const useGetConnectionLine = (id: string) =>
  useQuery({
    queryKey: ["Line", id],
    queryFn: () => fetchGetConnectionLine(id),
    enabled: !!id,
  });

export const useUpdateConnectionAi = (id: string) => {
  return useMutation({
    mutationFn: (values: ConnectAiValues) =>
      fetchUpdateConnectionAi(id, values),
  });
};

export const useGetConnectionAi = (id: string) =>
  useQuery({
    queryKey: ["OpenAi", id],
    queryFn: () => fetchGetConnectionAi(id),
    enabled: !!id,
  });

export const usePaginatedChatRoomAI = (chatRoomId: string) => {
  return useInfiniteQuery({
    queryKey: ["roomChat-ai", chatRoomId],
    queryFn: async ({ pageParam }) =>
      fetchRoomChatAILoadMore(chatRoomId, pageParam, 10),

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.meta;

      return meta?.hasMore ? meta.offset + meta.limit : undefined;
    },
    enabled: !!chatRoomId,
  });
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (payload: PushMessageValues) => fetchSendMessage(payload),
  });
};

export const usePaginatedChatRooms = () => {
  return useInfiniteQuery({
    queryKey: ["roomChat"],
    queryFn: async ({ pageParam }) => fetchRoomChatLoadMore(pageParam, 20),

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.meta;

      return meta?.hasMore ? meta.offset + meta?.limit : undefined;
    },
  });
};
