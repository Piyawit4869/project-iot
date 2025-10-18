"use server";

import type { UsersFormValues } from "~/schemas/users/user";
import { ApiConfig } from "../config";
import type { PasswordFormValues } from "~/schemas/users/password-user";

export const fetchUserPagination = async (params: {
  page: number;
  limit: number;
  status: string;
  userName?: string;
  email?: string;
  emId?: string;
  active?: boolean;
  phone?: number;
  gender?: number;
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

    console.log({ res });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchGetAllUsers = async () => {
  try {
    const { data } = await ApiConfig.get(`/crud/users`);
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
    return error;
  }
};

export const fetchUpdateUsers = async (
  id: string,
  payload: UsersFormValues
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
  payload: PasswordFormValues
) => {
  try {
    const { data } = await ApiConfig.put(
      `/crud/users/change-password/${id}`,
      payload
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
