import type {
  AddressSchemaValues,
  ConnectAiValues,
  ConnectLineValues,
  OrganizationFormValues,
  PushMessageValues,
  SettingSchemaValues,
} from "~/schemas/settings";
import { ApiConfig } from "../config";
import { generateOrganizationCode } from "~/utils/organization";

export const fetchGetOrganizations = async () => {
  try {
    const res = await ApiConfig.get(`/configurations/organizations/details`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateOrganization = async (
  id: string,
  payload: OrganizationFormValues,
  userId: string
) => {
  try {
    const body = {
      ...payload,
      userId: userId,
      code: generateOrganizationCode(id, payload.code),
      status: payload.status || undefined,
      type: payload.branchType || undefined,
    };

    const res = await ApiConfig.put(
      `/configurations/organizations/details/edit`,
      body
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateSettingAddress = async (
  payload: AddressSchemaValues
) => {
  try {
    const res = await ApiConfig.put(
      `/configurations/organizations/details/addresses/edit`,
      payload
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateSetting = async (payload: SettingSchemaValues) => {
  try {
    const res = await ApiConfig.put(
      `/configurations/organizations/details/settings/edit/`,
      payload
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchBranchPagination = async (params: {
  page: number;
  limit: number;
}) => {
  try {
    const res = await ApiConfig.get(`/configurations/branches/paginate`, {
      params: {
        page: params.page,
        limit: params.limit,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchChatBotPagination = async (params: {
  page: number;
  limit: number;
}) => {
  try {
    const res = await ApiConfig.get("/configurations/integrations", {
      params,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateConnectionLine = async (
  id: string,
  payload: ConnectLineValues
) => {
  try {
    const res = await ApiConfig.put(
      `/thirdparty/line/config/${id}/edit`,
      payload
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGetConnectionLine = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/thirdparty/line/config/${id}`);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUpdateConnectionAi = async (
  id: string,
  payload: ConnectAiValues
) => {
  try {
    const res = await ApiConfig.put(
      `/thridparty/openai/config/${id}/edit`,
      payload
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGetConnectionAi = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/thridparty/openai/config/${id}`);

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

export const fetchRoomChatAIConfigLoadMore = async (
  chatRoomId: string,
  offset = 0,
  limit = 10
) => {
  try {
    const res = await ApiConfig.get(`/chats/${chatRoomId}/messages`, {
      params: { offset, limit, type: "config" },
    });

    return res.data;
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

export const fetchLineMassagePaginate = async (params: {
  page: number;
  itemsPerPage: number;
  limit: number;
}) => {
  try {
    const p = Object.assign({});
    p.page = params.page;
    p.limit = params.limit;

    const res = await ApiConfig.get(`/thirdparty/line/content-reply/paginate`, {
      params: p,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};
