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

// export const fetchProducts = async (id: string) => {
//   try {
//     const res = await apiAxios.get(`/crud/user/${id}`);
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };

export const fetchProducts = async (
  params: {
    page: number;
    itemsPerPage: number;
  },
  accessToken: string
) => {
  try {
    const res = await axios.get(`${env.base_url}/crud/items`, {
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

export const fetchCreateProducts = async (
  name: string | undefined,
  description: string | undefined,
  quantity: string | undefined,
  price: string | undefined,
  discount: string | undefined,
  total: string | undefined,
  accessToken: string | undefined
) => {
  try {
    const res = await axios.post(`${env.base_url}/crud/items/create`, {
      name,
      description,
      quantity,
      price,
      discount,
      total,
      accessToken,
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
