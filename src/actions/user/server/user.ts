import { env } from "@/constants/common";
import { UsersFormValues } from "@/schemas/users/users";
import { apiAxios } from "@/utils/axiosInterceptor";
import axios from "axios";

export const fetchMe = async () => {
  try {
    const res = await apiAxios.get("/auth/me");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUsers = async (
  params: {
    page: number;
    itemsPerPage: number;
  },
  accessToken: string
) => {
  try {
    const res = await axios.get(`${env.base_url}/crud/users`, {
      params: {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.res;
  } catch (error) {
    return error;
  }
};

export const fetchGetUsers = async (id: string, accessToken: string) => {
  try {
    const res = await axios.get(`${env.base_url}/crud/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCreateUsers = async (
  payload: UsersFormValues,
  accessToken: string | undefined
) => {
  try {
    const res = await axios.post(`${env.base_url}/crud/users/create`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUpdateUsers = async (
  id: string,
  accessToken: string,
  payload: UsersFormValues
) => {
  try {
    const res = await axios.put(
      `${env.base_url}/crud/users/edit/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchDeleteUsers = async (id: string, accessToken: string) => {
  try {
    const res = await axios.delete(`${env.base_url}/crud/users/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const signin = async () => {
  const res = await apiAxios.get("/api/signin");
  return res.data;
};
