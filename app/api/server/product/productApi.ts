"use server";

import { ApiConfig } from "~/api/config";

export const getProductPaginate = async (params: {
  page: number;
  limit: number;
  name?: string;
}) => {
  try {
    const res = await ApiConfig.get(`/crud/products/paginate`, {
      params: {
        page: params.page,
        limit: params.limit,
        name: params.name,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getProducts = async () => {
  try {
    const res = await ApiConfig.get(`/crud/products`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await ApiConfig.get(`/crud/products/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createProduct = async (body: object) => {
  try {
    const response = await ApiConfig.post("/crud/products/create", body);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (id: string, body: object) => {
  try {
    const response = await ApiConfig.put(`/crud/products/edit/${id}`, body);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await ApiConfig.delete(`/crud/products/delete/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
