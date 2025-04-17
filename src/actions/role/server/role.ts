import { env } from "@/constants/common";
import { RoleFormValues } from "@/schemas/role/role";
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

export const fetchRole = async (
  params: {
    page: number;
    itemsPerPage: number;
  },
  accessToken: string
) => {
  try {
    const res = await axios.get(`${env.base_url}/crud/roles/paginate`, {
      params: {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.res.items;
  } catch (error) {
    return error;
  }
};

export const fetchGetRole = async (id: string, accessToken: string) => {
  try {
    const res = await axios.get(`${env.base_url}/crud/roles/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCreateRole = async (
  payload: RoleFormValues,
  accessToken: string | undefined
) => {
  try {
    const res = await axios.post(`${env.base_url}/crud/roles`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUpdateRole = async (
  id: string,
  accessToken: string,
  payload: RoleFormValues
) => {
  try {
    const res = await axios.put(
      `${env.base_url}/crud/roles/edit/${id}`,
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

export const fetchDeleteRole = async (id: string, accessToken: string) => {
  try {
    const res = await axios.delete(`${env.base_url}/crud/roles/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
