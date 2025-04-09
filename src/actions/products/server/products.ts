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

export const signin = async () => {
  const res = await apiAxios.get("/api/signin");
  return res.data;
};
