import { env } from "@/constants/common";
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
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchGetProducts = async (id: string, accessToken: string) => {
  try {
    const res = await axios.get(`${env.base_url}/crud/items/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCreateProducts = async (
  payload: {
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    total: number;
  },
  accessToken: string | undefined
) => {
  try {
    const res = await axios.post(
      `${env.base_url}/crud/items/create`,
      {
        name: payload.name,
        description: payload.description,
        quantity: payload.quantity,
        unitPrice: payload.unitPrice,
        discount: payload.discount,
        total: payload.total,
      },
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

export const fetchUpdateProducts = async (
  id: string,
  accessToken: string,
  payload: {
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    total: number;
  }
) => {
  try {
    const res = await axios.put(
      `${env.base_url}/crud/items/edit/${id}`,
      {
        name: payload.name,
        description: payload.description,
        quantity: payload.quantity,
        unitPrice: payload.unitPrice,
        discount: payload.discount,
        total: payload.total,
      },
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

export const fetchDeleteProducts = async (id: string, accessToken: string) => {
  try {
    const res = await axios.delete(`${env.base_url}/crud/items/delete/${id}`, {
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
