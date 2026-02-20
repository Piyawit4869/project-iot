import type { UsersFormValues } from "~/schemas/users/user";
import { ApiConfig } from "../config";
import type { PasswordFormValues } from "~/schemas/users/password-user";
import axios from "axios";

export const fetchUserPagination = async (params: {
  page: number;
  limit: number;
  status: string;
  userName?: string;
  fullname?: string;
  email?: string;
  emId?: string;
  active?: boolean;
  phone?: string;
  gender?: number;
  createdBy?: string;
  updatedBy?: string;
  createdFrom?: string;
  createdTo?: string;
  updatedFrom?: string;
  updatedTo?: string;
}) => {
  try {
    const p = { ...params } as any;
    // p.page = params.page;
    // p.userName = params.userName;
    // p.email = params.email;
    // p.limit = params.limit;
    if (params.status && params.status === "all") {
      delete p.status;
    }

    const res = await ApiConfig.get(`/crud/users/paginate`, {
      params: p,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchLogsPagination = async ({
  page,
  limit,
  name,
  ok,
  trigger,
  token,
}: {
  page: number;
  limit: number;
  name?: string;
  ok?: boolean;
  trigger?: string;
  token: string;
}) => {
  try {
    const params = new URLSearchParams({
      token,
      page: String(page),
      limit: String(limit),
    });

    if (name) params.append("name", name);
    if (ok !== undefined) params.append("ok", String(ok));
    if (trigger) params.append("trigger", trigger);

    const url = `http://127.0.0.1:9000/logs?${params.toString()}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};

export const fetchFacesPagination = async ({
  page,
  limit,
  name,
  token,
}: {
  page: number;
  limit: number;
  name?: string;
  token: string;
}) => {
  const params = new URLSearchParams({
    token,
    page: String(page),
    limit: String(limit),
  });

  if (name) params.append("name", name);

  const url = `http://127.0.0.1:9000/faces/list?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }

  const data = await res.json();
  console.log("data", data);

  return data;
};

export const deleteFace = async ({
  name,
  token,
}: {
  name: string;
  token: string;
}) => {
  const params = new URLSearchParams({
    token,
    name,
  });

  const res = await fetch(
    `http://127.0.0.1:9000/faces/delete?${params.toString()}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    throw new Error("Delete failed");
  }

  return res.json();
};

export const fetchGetSearchlUsers = async (params: { search?: string }) => {
  try {
    const { data } = await ApiConfig.get(`/crud/users/paginate`, {
      params,
    });
    return data.items;
  } catch (error) {
    return error;
  }
};

export const fetchGetAllUsers = async (params?: { role?: string | null }) => {
  try {
    const { data } = await ApiConfig.get(`/crud/users`, { params });
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchGetAllUsersLimit = async (params: { isAll: boolean }) => {
  try {
    const { data } = await ApiConfig.get(`/crud/users/?limit=0`, {
      params: {
        isAll: params.isAll,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchUserById = async (id: string) => {
  try {
    const { data } = await ApiConfig.get(`/crud/users/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchCreateUser = async (payload: UsersFormValues) => {
  try {
    const { data } = await ApiConfig.post(`/crud/users/create`, payload);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("HTTP", error.response?.status);
      console.error("DATA →", JSON.stringify(error.response?.data, null, 2)); // สำคัญสุด
      console.error("HEADERS →", error.response?.headers);
    }
    throw error;
  }
};

export const fetchUpdateUsers = async (
  id: string,
  payload: UsersFormValues,
) => {
  try {
    const res = await ApiConfig.put(`/crud/users/edit/${id}`, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchChangePassword = async (
  id: string,
  payload: PasswordFormValues,
) => {
  try {
    const { data } = await ApiConfig.put(
      `/crud/users/change-password/${id}`,
      payload,
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchDeleteUsers = async (id: string) => {
  try {
    const { data } = await ApiConfig.delete(`/crud/users/delete/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchGetAllDepartments = async (params: { isAll: boolean }) => {
  try {
    const { data } = await ApiConfig.get(`/crud/departments/`, {
      params: {
        isAll: params.isAll,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const fetchUserSummary = async () => {
  try {
    const res = await ApiConfig.get(`/crud/users/status-summary`);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchSearchUserOrgs = async (search?: string) => {
  try {
    const { data } = await ApiConfig.get(`/crud/users/search/organizations`, {
      params: search,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchSearchUserBranches = async (
  groupId: string,
  search?: string,
) => {
  try {
    const { data } = await ApiConfig.get(
      `/crud/users/search/${groupId}/branches`,
      {
        params: search,
      },
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const changeActiveOrg = async (
  userId: string,
  payload: { organizationId: string },
) => {
  try {
    const { data } = await ApiConfig.put(`/crud/users/meta/${userId}`, payload);
    return data;
  } catch (error) {
    return error;
  }
};

export const checkUserEmailDuplicate = async (payload: {
  email: string;
}): Promise<boolean> => {
  try {
    const { data } = await ApiConfig.post("/crud/users/email-check", payload);

    return data.result as boolean;
  } catch (error) {
    throw error;
  }
};

export const checkUserNameDuplicate = async (payload: {
  username: string;
}): Promise<boolean> => {
  try {
    const { data } = await ApiConfig.post(
      "/crud/users/username-check",
      payload,
    );

    return data.result as boolean;
  } catch (error) {
    throw error;
  }
};
