import { ApiConfig } from "~/api/config";
import type { Product } from "~/schemas/product/product";

export const fetchProduct = async (params: {
  page?: number;
  limit?: number;
  name?: string;
  sorting?: any;
  searchTerms?: any;
  status: string;
}) => {
  try {
    const p = Object.assign({});
    p.page = params.page;
    p.limit = params.limit;
    if (params.status && params.status !== "all") {
      p.status = params.status;
    }

    const res = await ApiConfig.get(`/crud/products/paginate`, {
      params: p,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchProducts = async (params: {
  page?: number;
  limit?: number;
  name?: string;
  sorting?: any;
  searchTerms?: any;
}) => {
  try {
    const res = await ApiConfig.get(`/crud/products/paginate`, {
      params: {
        page: params.page,
        limit: params.limit,
        name: params.name || "",
        ...params.searchTerms,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchGetProducts = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/crud/products/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCreateProducts = async (payload: Product) => {
  try {
    const res = await ApiConfig.post(`/crud/products/create`, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateProducts = async (id: string, payload: Product) => {
  try {
    const res = await ApiConfig.put(`/crud/products/edit/${id}`, payload);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDeleteProducts = async (id: string) => {
  try {
    const res = await ApiConfig.delete(`/crud/products/delete/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchProductsSummary = async () => {
  try {
    const res = await ApiConfig.get(`/crud/products/status-summary`);
    return res.data;
  } catch (error) {
    return error;
  }
};
