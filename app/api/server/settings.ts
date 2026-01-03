import type {
  AddressSchemaValues,
  ConnectAiValues,
  ConnectLineValues,
  BranchesOrganization,
  OrganizationFormValues,
  PushMessageValues,
  SettingSchemaValues,
  settingTheme,
} from "~/schemas/settings";
import { ApiConfig } from "../config";
import { generateOrganizationCode } from "~/utils/organization";

export const fetchGetOrganizationsPaginate = async (params: {
  page: number;
  limit: number;
}) => {
  try {
    const res = await ApiConfig.get(`/crud/organizations`, {
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

export const fetchCreateBranchesOrganizations = async (
  value: BranchesOrganization
) => {
  try {
    const res = await ApiConfig.post(`/crud/branches/create`, value);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGetOrganizations = async () => {
  try {
    const res = await ApiConfig.get(`/configurations/organizations/details`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGetBranchesOrganization = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/crud/branches/organizations/${id}`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGetBranchesDetail = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/configurations/branches/${id}/details`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

// branches
export const fetchDetailBranchesOrganization = async (
  id: string,
  payload: BranchesOrganization
) => {
  try {
    const body = {
      ...payload,
    };

    const res = await ApiConfig.put(
      `/configurations/branches/${id}/details/edit`,
      body
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDetailAddressBranches = async (
  id: string,
  payload: BranchesOrganization
) => {
  try {
    const body = {
      ...payload,
    };

    const res = await ApiConfig.put(
      `/configurations/branches/${id}/details/addresses/edit`,
      body
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDetailSettingBranches = async (
  id: string,
  payload: BranchesOrganization
) => {
  try {
    const body = {
      ...payload,
    };

    const res = await ApiConfig.put(
      `/configurations/branches/${id}/details/settings/edit`,
      body
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGetOrganizationDetail = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/crud/organizations/${id}`);

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
      `/configurations/organizations/${id}/details/edit`,
      body
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateSettingAddress = async (
  orgId: string,
  id: string,

  payload: AddressSchemaValues
) => {
  try {
    const body = {
      ...payload,
      id: id,
    };

    const res = await ApiConfig.put(
      `/configurations/organizations/${orgId}/details/addresses/edit`,
      body
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateSetting = async (
  orgId: string,
  id: string,
  payload: settingTheme
) => {
  try {
    const body = {
      ...payload,
      id: id,
    };
    const res = await ApiConfig.put(
      `/configurations/organizations/${orgId}/details/settings/edit`,
      body
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

export const fetchCreateConfigAi = async (payload: ConnectAiValues) => {
  try {
    const res = await ApiConfig.post(
      `/thridparty/openai/config/created`,
      payload
    );

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

export const fetchResetAi = async (id: string) => {
  try {
    const res = await ApiConfig.put(
      `/thridparty/openai/config/${id}/clear-thread`
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchResetAiChatRoom = async (id: string) => {
  try {
    const res = await ApiConfig.put(`/chats/assistant/${id}/clear-thread`);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchGetConnectionAiByBranch = async (branchId: string) => {
  try {
    const res = await ApiConfig.get(
      `/thridparty/openai/config/branch/${branchId}`
    );
    return res.data;
  } catch (error) {
    throw error;
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

export const fetchLineFeaturePaginate = async (params: {
  page: number;
  itemsPerPage: number;
  limit: number;
}) => {
  try {
    const p = Object.assign({});
    p.page = params.page;
    p.limit = params.limit;

    const res = await ApiConfig.get(`/thirdparty/line/contents/paginate`, {
      params: p,
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

    const res = await ApiConfig.get(
      `/thirdparty/line/contents/paginate?type=reply`,
      {
        params: p,
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchLineCardContentPaginate = async (params: {
  page: number;
  itemsPerPage: number;
  limit: number;
  filter?: { category: string };
}) => {
  try {
    const p = Object.assign({});
    p.page = params.page;
    p.limit = params.limit;

    const res = await ApiConfig.get(
      `/thirdparty/line/contents/paginate?type=card&category=${params.filter?.category || ""}`,
      {
        params: p,
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getCardContent = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/thirdparty/line/contents/${id}`);

    return res.data;
  } catch (error) {
    return error;
  }
};
