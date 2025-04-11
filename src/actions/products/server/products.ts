import { env } from "@/constants/common";
import { ProductsFormValues } from "@/schemas/products/product";
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

export const fetchProducts = async (
  params: {
    page: number;
    itemsPerPage: number;
  },
  accessToken: string
) => {
  try {
    const res = await axios.get(`${env.base_url}/crud/products`, {
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

export const fetchGetProducts = async (id: string, accessToken: string) => {
  try {
    const res = await axios.get(`${env.base_url}/crud/products/${id}`, {
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
  payload: ProductsFormValues,
  accessToken: string | undefined
) => {
  try {
    const res = await axios.post(
      `${env.base_url}/crud/products/create`,
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

export const fetchUpdateProducts = async (
  id: string,
  accessToken: string,
  payload: ProductsFormValues
) => {
  try {
    const res = await axios.put(
      `${env.base_url}/crud/products/edit/${id}`,
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

export const fetchDeleteProducts = async (id: string, accessToken: string) => {
  try {
    const res = await axios.delete(`${env.base_url}/crud/products/${id}`, {
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
