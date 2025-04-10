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
    quantity: number;
    brand: string;
    status: string;
    sku: string;
    type: string;
    price: number;
    imageUrl: string;
    detail: string;
    description: string;
    manufacturedDate: string;
    expireDate: string;
    weight: number;
    country: string;
    subRegion: string;
    vintage: string;
    colour: string;
    alcohol: number;
    bottleSize: number;
    reference: string;
    width: number;
    height: number;
  },
  accessToken: string | undefined
) => {
  try {
    const res = await axios.post(
      `${env.base_url}/crud/products/create`,
      {
        name: payload.name,
        quantity: payload.quantity,
        brand: payload.brand,
        status: payload.status,
        sku: payload.sku,
        type: payload.type,
        price: payload.price,
        imageUrl: payload.imageUrl,
        detail: payload.detail,
        description: payload.description,
        manufacturedDate: payload.manufacturedDate,
        expireDate: payload.expireDate,
        weight: payload.weight,
        country: payload.country,
        subRegion: payload.subRegion,
        vintage: payload.vintage,
        colour: payload.colour,
        alcohol: payload.alcohol,
        bottleSize: payload.bottleSize,
        reference: payload.reference,
        width: payload.width,
        height: payload.height,
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
